import * as service from '../services/userService';
import { Request, Response } from 'express';

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any).id;
        const user = await service.getUserById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { password, ...safe } = user;
        return res.status(200).json(safe);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error fetching user data' });
    }
};

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await service.getAllUsers();
        return res.status(200).json(users);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error fetching users' });
    }
};
