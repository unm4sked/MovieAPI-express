import { Movie } from '../models/movie';
import { readDataFromFile } from '../services/fileService';

export const returnListOfMovieForDefinedGenresAndDuration = async (
    genres: string[],
    duration: number,
): Promise<Movie[]> => {
    const data = await readDataFromFile();

    const movies = data.movies;

    return rankByGenres(
        <Movie[]>movies.filter((movie) => isBetweenPlusMinusValue(duration, Number(movie.runtime), 10)),
        genres,
    );
};

export const singleRandomMovieWithDuration = async (duration: number, movies: Movie[]): Promise<Movie> =>
    selectRandomValueFromArray(
        <Movie[]>movies.filter((movie) => isBetweenPlusMinusValue(duration, Number(movie.runtime), 10)),
    );

export const isBetweenPlusMinusValue = (duration: number, runtime: number, value: number) =>
    runtime + value >= duration && runtime - value <= duration;

export const selectRandomValueFromArray = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const rankByGenres = (movies: Movie[], genres: string[]): Movie[] => <Movie[]>movies
        .map((movie) => {
            let weight = 0;
            movie.genres.forEach((g) => {
                if (genres.includes(g)) {
                    weight++;
                }
            });

            return { ...movie, weight };
        })
        .filter((movie) => movie.weight)
        .sort((a, b) => b.weight - a.weight)
        .map((movie) => {
            const { weight, ...m } = movie;

            return m;
        });

export const sanitizeGenres = (genres?: string): string[] => {
    if (!genres) {
        return [];
    }

    return [...genres.split(',')].flat(Infinity).filter((x) => x);
};
