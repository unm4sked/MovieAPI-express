import { Request, Response, Router } from 'express';
import { Movie, IMovie } from '../models/movie';
import { validateInputData, validate, validateNumberParamter } from '../services/validationService';
import { getMovies, getMovieById, getRandomMovie } from '../services/movieService';
import { asyncHandler } from '../middlewares/errors';

export const router = Router();

router.get(
    '/movies',
    asyncHandler(async (req: Request, res: Response) => {
        const movies = await getMovies();

        res.status(200);
        res.json(movies);
    }),
);

router.get(
    '/movies/:movieId',
    asyncHandler(async (req: Request, res: Response) => {
        validateNumberParamter(req.params.movieId);
        const id = Number(req.params.movieId);

        const movie = await getMovieById(id);

        if (!movie) {
            res.status(404).json({ error: `The movie with id ${id} does not exist.` });
        }

        res.status(200).json(movie);
    }),
);

router.post(
    '/movies',
    validate,
    asyncHandler(async (req: Request, res: Response) => {
        validateInputData(req, res);
        const input = <IMovie>req.body;
        const movie = new Movie(input);
        await movie.save();

        res.sendStatus(201);
    }),
);

router.get(
    '/random',
    asyncHandler(async (req: Request, res: Response) => {
        const genres = <string>req.query.genres;
        const duration = <string>req.query.duration;

        const result = await getRandomMovie(genres, duration);

        res.status(200).json(result);
    }),
);
