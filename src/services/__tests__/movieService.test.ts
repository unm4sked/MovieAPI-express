import { getRandomMovie } from '../movieService';
import { Movie } from '../../models/movie';

describe('getRandomMovie function depending on the parameters it should', () => {
    test('return exception for incorrect parameter', async () => {
        expect(async () => {
            await getRandomMovie('Comedy', 'ABC');
        }).rejects.toThrow('Invalid duration parameter, You have to provide a number.');
    });

    test('return one random movie', async () => {
        const duration: any = null;
        const movie = await getRandomMovie(undefined, duration);

        expect(movie).not.toBeNull();
        expect(movie).toHaveProperty('id');
    });

    test('return list of movies for defined duration and genres', async () => {
        const movies = <Movie[]>await getRandomMovie('Fantasy', '90');

        movies.forEach((x) => {
            expect(Number(x.runtime)).toBeLessThanOrEqual(100);
            expect(Number(x.runtime)).toBeGreaterThanOrEqual(80);
            expect(x.genres).toContain('Fantasy');
        });
    });

    test('return movies matched for the genres', async () => {
        const duration: any = null;

        const movies = <Movie[]>await getRandomMovie('Fantasy,Comedy', duration);
        movies.forEach((x) => {
            expect(x.genres.includes('Fantasy') || x.genres.includes('Comedy')).toBeTruthy();
        });
    });

    test('return one random movie with specify duration', async () => {
        const movie = <Movie>await getRandomMovie(undefined, '90');

        expect(Number(movie.runtime)).toBeLessThanOrEqual(100);
        expect(Number(movie.runtime)).toBeGreaterThanOrEqual(80);
    });
});
