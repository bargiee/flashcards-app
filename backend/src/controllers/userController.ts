import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';
import * as service from '../services/userService';

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user as any).id;
        const user = await service.getUserById(userId);

        if (!user) {
            return next(new HttpError(404, 'User not found'));
        }

        const { password, ...safe } = user;
        return res.status(200).json(safe);
    } catch (e) {
        return next(e);
    }
};

export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await service.getAllUsers();
        return res.status(200).json(users);
    } catch (e) {
        return next(e);
    }
};
