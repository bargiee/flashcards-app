import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting users' });
    }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching user' });
    }
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required' });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        });

        return res.status(201).json(newUser);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res
                .status(409)
                .json({ message: 'User with given email or username already exists' });
        }

        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const { username, email } = req.body;

    try {
        const existing = await prisma.user.findUnique({ where: { id: userId } });

        if (!existing) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updated = await prisma.user.update({
            where: { id: userId },
            data: {
                username: username ?? existing.username,
                email: email ?? existing.email,
            },
        });

        return res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating user' });
    }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    try {
        await prisma.user.delete({ where: { id: userId } });
        return res.status(200).json({ message: `User with id ${userId} deleted` });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'User not found' });
        }

        console.error(error);
        return res.status(500).json({ message: 'Error deleting user' });
    }
};
