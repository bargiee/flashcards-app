import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';
import * as service from '../services/authService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    try {
        const user = await service.registerUser(username, email, password);
        res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (e: any) {
        if (e.code === 'P2002') {
            return next(new HttpError(409, 'Username or email already exists'));
        }
        next(e);
    }
};

export const login = (req: Request, res: Response, next: NextFunction) =>
    service.authenticateUser(req, res, next);

export const refresh = (req: Request, res: Response, next: NextFunction) => {
    try {
        service.refreshTokens(req, res);
    } catch (e) {
        next(e);
    }
};

export const logout = (_req: Request, res: Response) => {
    res.clearCookie('token')
        .clearCookie('refreshToken', { path: '/api/auth/refresh' })
        .status(200)
        .json({ message: 'Logged out' });
};
