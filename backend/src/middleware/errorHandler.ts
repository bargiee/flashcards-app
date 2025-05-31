import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err.message || 'Internal server error';

    if (status === 500) {
        console.error('Unhandled Error:', err);
    }

    res.status(status).json({ error: message, status });
}
