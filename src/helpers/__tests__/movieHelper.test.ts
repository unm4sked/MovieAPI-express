import { sanitizeGenres, isBetweenPlusMinusValue, rankByGenres } from '../movieHelpers';

describe('Helpers functions', () => {
    test('sanitizeGenres should correctly transform string to array', () => {
        const genresString = 'Sport,Comedy';

        const genresArray = sanitizeGenres(genresString);

        expect(genresArray).toBeTruthy();
        expect(genresArray).toContain('Sport');
        expect(genresArray).toContain('Comedy');
        expect(genresArray).not.toContain('');
    });

    test('isBetweenPlusMinusValue function should be logically correct', () => {
        const value = 90;
        const margin = 10;

        expect(isBetweenPlusMinusValue(value, 79, margin)).toBeFalsy();
        expect(isBetweenPlusMinusValue(value, 80, margin)).toBeTruthy();
        expect(isBetweenPlusMinusValue(value, 85, margin)).toBeTruthy();
        expect(isBetweenPlusMinusValue(value, 95, margin)).toBeTruthy();
        expect(isBetweenPlusMinusValue(value, 100, margin)).toBeTruthy();
        expect(isBetweenPlusMinusValue(value, 101, margin)).toBeFalsy();
    });

    test('rankByGenres', () => {
        const mockedGenresCase1 = ['Sport', 'Comedy', 'Drama', 'Bio'];
        const mockedGenresCase2 = ['Drama', 'Bio'];

        const mockedMovies: any = [
            { genres: ['Comedy'] },
            { genres: ['Sport'] },
            { genres: ['Comedy', 'Drama'] },
            { genres: ['Comedy', 'Drama', 'Bio'] },
        ];

        const moviesCase1 = rankByGenres(mockedMovies, mockedGenresCase1);
        expect(moviesCase1.length).toEqual(4);
        expect(moviesCase1[0]).toMatchObject(mockedMovies[3]);
        expect(moviesCase1[1]).toMatchObject(mockedMovies[2]);

        const moviesCase2 = rankByGenres(mockedMovies, mockedGenresCase2);
        expect(moviesCase2.length).toEqual(2);
        expect(moviesCase2[0]).toMatchObject(mockedMovies[3]);
        expect(moviesCase2[1]).toMatchObject(mockedMovies[2]);
    });
});
