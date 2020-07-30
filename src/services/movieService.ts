import { Movie } from '../models/movie';
import {
    selectRandomValueFromArray,
    singleRandomMovieWithDuration,
    rankByGenres,
    returnListOfMovieForDefinedGenresAndDuration,
    sanitizeGenres,
} from '../helpers/movieHelpers';
import { readDataFromFile } from './fileService';
import { validateNumberParamter } from './validationService';

export const getMovies = async (): Promise<Movie[]> => {
    const data = await readDataFromFile();

    return data.movies;
};

export const getMovieById = async (id: number): Promise<Movie> => {
    const data = await readDataFromFile();
    const movies = data.movies;
    const movie = movies.filter((x) => x.id === id)[0];

    return movie;
};

export const getRandomMovie = async (genres?: string, duration?: string): Promise<Movie | Movie[]> => {
    const data = await readDataFromFile();
    const movies = data.movies;

    const sanitizedGenres = sanitizeGenres(genres);
    validateNumberParamter(duration);
    const durationNumber = Number(duration);

    if (!sanitizedGenres?.length && !duration) {
        return selectRandomValueFromArray(movies);
    }

    if (!sanitizedGenres?.length && duration) {
        return singleRandomMovieWithDuration(durationNumber, movies);
    }

    if (sanitizedGenres?.length && !duration) {
        return rankByGenres(movies, sanitizedGenres);
    }

    return returnListOfMovieForDefinedGenresAndDuration(sanitizedGenres, durationNumber);
};
