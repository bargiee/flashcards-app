import { Request, Response } from 'express';
import * as service from '../services/favoriteDeckService';

export const getFavoriteDecksByUser = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any).id;
        const favs = await service.getFavorites(userId);
        res.status(200).json(favs);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error fetching favorites' });
    }
};

export const addFavoriteDeck = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { deckId } = req.body;

    if (!deckId) {
        return res.status(400).json({ message: 'deckId is required' });
    }

    try {
        const fav = await service.addFavorite(userId, Number(deckId));
        res.status(201).json(fav);
    } catch (e: any) {
        if (e.message === 'ALREADY_EXISTS') {
            return res.status(409).json({ message: 'Already in favorites' });
        }
        console.error(e);
        res.status(500).json({ message: 'Error adding favorite' });
    }
};

export const removeFavoriteDeck = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { deckId } = req.body;

    if (!deckId) {
        return res.status(400).json({ message: 'deckId is required' });
    }

    try {
        await service.removeFavorite(userId, Number(deckId));
        res.status(200).json({ message: 'Removed from favorites' });
    } catch (e: any) {
        if (e.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        console.error(e);
        res.status(500).json({ message: 'Error removing favorite' });
    }
};
