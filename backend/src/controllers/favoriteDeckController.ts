import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';
import * as service from '../services/favoriteDeckService';

export const getFavoriteDecksByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user as any).id;
        const favs = await service.getFavorites(userId);
        return res.status(200).json(favs);
    } catch (e) {
        return next(e);
    }
};

export const addFavoriteDeck = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    const { deckId } = req.body;

    if (!deckId) {
        return next(new HttpError(400, 'deckId is required'));
    }

    try {
        const fav = await service.addFavorite(userId, Number(deckId));
        return res.status(201).json(fav);
    } catch (e: any) {
        if (e.message === 'ALREADY_EXISTS') {
            return next(new HttpError(409, 'Already in favorites'));
        }
        return next(e);
    }
};

export const removeFavoriteDeck = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    const { deckId } = req.body;

    if (!deckId) {
        return next(new HttpError(400, 'deckId is required'));
    }

    try {
        await service.removeFavorite(userId, Number(deckId));
        return res.status(200).json({ message: 'Removed from favorites' });
    } catch (e: any) {
        if (e.message === 'NOT_FOUND') {
            return next(new HttpError(404, 'Favorite not found'));
        }
        return next(e);
    }
};
