import { validateGenres } from '../validationService';

describe('custom validator to check if array of strings provided by user is in predefined array of strings', () => {
    const definedArr = ['a', 'b', 'c', 'd'];

    test('validateGenres function return error object when value from user array is not defined in predefined array', () => {
        const input = ['a', 'b', 'x'];
        const output = validateGenres(input, definedArr);

        expect(output).not.toBeNull();
        expect(output?.value).toBe(input[2]);
    });

    test('validateGenres function should return null', () => {
        const input = ['a', 'b', 'd'];
        const output = validateGenres(input, definedArr);

        expect(output).toBeNull();
    });
});
