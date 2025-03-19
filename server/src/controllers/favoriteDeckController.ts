import { Request, Response } from 'express';
import { dummyFavoriteDecks, FavoriteDeck } from '../models/favoriteDeckModel';

export const getFavoriteDecksByUser = (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const userFavorites = dummyFavoriteDecks.filter((f) => f.userId === userId);

    if (userFavorites.length === 0) {
        return res.status(404).json({ message: 'No favorite decks found for this user' });
    }
    return res.status(200).json(userFavorites);
};

export const addFavoriteDeck = (req: Request, res: Response) => {
    const { userId, deckId } = req.body;

    if (!userId || !deckId) {
        return res.status(400).json({ message: 'userId and deckId are required' });
    }

    const exists = dummyFavoriteDecks.some((f) => f.userId === userId && f.deckId === deckId);
    if (exists) {
        return res.status(409).json({ message: 'Deck is already in favorites' });
    }

    const newFavorite: FavoriteDeck = { userId: Number(userId), deckId: Number(deckId) };
    dummyFavoriteDecks.push(newFavorite);

    return res.status(201).json(newFavorite);
};

export const removeFavoriteDeck = (req: Request, res: Response) => {
    const { userId, deckId } = req.body;

    if (!userId || !deckId) {
        return res.status(400).json({ message: 'userId and deckId are required' });
    }

    const index = dummyFavoriteDecks.findIndex((f) => f.userId === userId && f.deckId === deckId);
    if (index === -1) {
        return res.status(404).json({ message: 'Favorite not found' });
    }

    dummyFavoriteDecks.splice(index, 1);
    return res.status(200).json({ message: `Deck ${deckId} removed from favorites for user ${userId}` });
};
