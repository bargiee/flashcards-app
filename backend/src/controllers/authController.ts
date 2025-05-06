import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import passport from '../config/passport';
import prisma from '../config/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;

const COOKIE_OPTS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 1000 * 60 * 60 * 24 * 7,
};

const secretKey = JWT_SECRET as Secret;
const signOpts: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as any,
};

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body as {
        username: string;
        email: string;
        password: string;
    };

    const hash = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { username, email, password: hash },
        });

        return res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (e: any) {
        if (e.code === 'P2002') {
            return res.status(409).json({ message: 'Username or email already exists' });
        }
        console.error(e);
        return res.status(500).json({ message: 'Error registering user' });
    }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        'local',
        { session: false },
        (err: Error | null, user: any, info: any) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ message: info?.message || 'Login failed' });
            }

            const token = jwt.sign({ userId: user.id }, secretKey, signOpts);

            return res
                .cookie('token', token, COOKIE_OPTS)
                .status(200)
                .json({ message: 'Logged in' });
        }
    )(req, res, next);
};

export const logout = (_req: Request, res: Response) => {
    return res.clearCookie('token').status(200).json({ message: 'Logged out' });
};
