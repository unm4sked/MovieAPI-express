import { Request, Response, NextFunction } from 'express';

type MiddlewareWraperFunc = (req: Request, res: Response, next: NextFunction) => void;

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
    const err = new HttpException(404, '404 not found');
    next(err);
};

export const asyncHandler = (fn: MiddlewareWraperFunc) => (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

export const catchErrors = (err: HttpException, req: Request, res: Response, next: NextFunction): void => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
    });
};

export class HttpException extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
