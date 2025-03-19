import { Request, Response } from 'express';
import { dummyUsers, User } from '../models/userModel';

const getAllUsers = (req: Request, res: Response) => {
    return res.status(200).json(dummyUsers);
};

const getUserById = (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const user = dummyUsers.find((u) => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
};

const createUser = (req: Request, res: Response) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }

    const newId = dummyUsers.length > 0 ? dummyUsers[dummyUsers.length - 1].id + 1 : 1;
    const newUser: User = { id: newId, username, email };

    dummyUsers.push(newUser);
    return res.status(201).json(newUser);
};
