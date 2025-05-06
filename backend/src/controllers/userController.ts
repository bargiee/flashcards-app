import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/users/me
export const getMe = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { password, ...safe } = user;
    return res.status(200).json(safe);
};

export const getAllUsers = async (_req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
};
