import { Request, Response, NextFunction } from 'express';
import * as service from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const user = await service.registerUser(username, email, password);
        res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (e: any) {
        if (e.code === 'P2002') {
            return res.status(409).json({ message: 'Username or email already exists' });
        }
        console.error(e);
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
    service.authenticateUser(req, res, next);
};

export const logout = (_req: Request, res: Response) => {
    res.clearCookie('token').status(200).json({ message: 'Logged out' });
};
