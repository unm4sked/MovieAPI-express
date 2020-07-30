import * as db from '../../db/db.json';
import { check, validationResult } from 'express-validator';
import { Response, Request } from 'express';
import { HttpException } from '../middlewares/errors';

interface IGenresParamsError {
    value: string;
    msg: string;
    params: string;
    location: string;
}

export const validateGenres = (genres: string[], definedGenres: string[]): IGenresParamsError | null => {
    let error = null;

    genres.forEach((x) => {
        if (!definedGenres.includes(x)) {
            error = {
                value: x,
                msg: `acceptable values are: ${definedGenres.join(',')}`,
                params: 'genres',
                location: 'body',
            };
        }
    });

    return error;
};

export const validateInputData = (req: Request, res: Response): Response | void => {
    const definedGenres = db.genres;
    const errors = validationResult(req);
    const genresValidator = validateGenres(req.body.genres, definedGenres);

    if (!errors.isEmpty() || genresValidator) {
        const arrayOfErrors = [...errors.array(), genresValidator].filter((x) => x);
        return res.status(400).json({ errors: arrayOfErrors });
    }
};

export const validate = [
    check('title').trim().isLength({ min: 1, max: 255 }).withMessage('Title must be provided'),
    check('year').isNumeric().withMessage('Year must be provided as a number'),
    check('genres').isArray({ min: 1 }).withMessage('Genres must be provided'),
    check('runtime').isNumeric().withMessage('Runtime must be provided as a numeric value'),
    check('director').isLength({ min: 1, max: 255 }).withMessage('Director must be provided'),
];

export const validateNumberParamter = (duration?: string): void => {
    const durationNumber = Number(duration);

    if (isNaN(durationNumber)) {
        throw new HttpException(400, 'Invalid duration parameter, You have to provide a number.');
    }
};

export const validateGenresParamter = (genres: string): void => {
    const genresArr: string[] = <string[]>genres?.split(',');

    if (!genresArr?.length) {
        throw new HttpException(400, 'Invalid genres parameter, You have to provide a comma separated values.');
    }
};
