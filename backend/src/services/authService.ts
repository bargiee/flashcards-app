import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import prisma from '../config/prismaClient';
import passport from '../config/passport';
import { Request, Response, NextFunction } from 'express';

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN!);
const REFRESH_EXPIRES_IN = Number(process.env.JWT_REFRESH_EXPIRES_IN!);

const ACCESS_COOKIE_OPTS = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax' as const,
    maxAge: ACCESS_EXPIRES_IN * 1000,
};

const REFRESH_COOKIE_OPTS = {
    ...ACCESS_COOKIE_OPTS,
    maxAge: REFRESH_EXPIRES_IN * 1000,
    path: '/api/auth/refresh',
};

const accessSignOpts: SignOptions = {
    expiresIn: ACCESS_EXPIRES_IN,
};

const refreshSignOpts: SignOptions = {
    expiresIn: REFRESH_EXPIRES_IN,
};

export const registerUser = async (username: string, email: string, password: string) => {
    const hash = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: { username, email, password: hash },
    });
};

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        'local',
        { session: false },
        (err: Error | null, user: any, info: any) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ message: info?.message || 'Login failed' });
            }

            const accessToken = jwt.sign({ userId: user.id }, ACCESS_SECRET, accessSignOpts);
            const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, refreshSignOpts);

            return res
                .cookie('token', accessToken, ACCESS_COOKIE_OPTS)
                .cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTS)
                .status(200)
                .json({ message: 'Logged in' });
        }
    )(req, res, next);
};

export const refreshTokens = (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    try {
        const payload = jwt.verify(token, REFRESH_SECRET) as { userId: number };

        const newAccess = jwt.sign({ userId: payload.userId }, ACCESS_SECRET, {
            expiresIn: ACCESS_EXPIRES_IN,
        });

        return res
            .cookie('token', newAccess, ACCESS_COOKIE_OPTS)
            .status(200)
            .json({ message: 'Access token refreshed' });
    } catch {
        return res.sendStatus(401);
    }
};
