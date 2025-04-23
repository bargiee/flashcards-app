import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/favorite-decks/:userId
export const getFavoriteDecksByUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    try {
        const favorites = await prisma.favoriteDeck.findMany({
            where: { userId },
            include: { deck: true },
        });

        if (favorites.length === 0) {
            return res.status(404).json({ message: 'No favorite decks found for this user' });
        }

        return res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching favorite decks' });
    }
};

// POST /api/favorite-decks
export const addFavoriteDeck = async (req: Request, res: Response) => {
    const { userId, deckId } = req.body;

    if (!userId || !deckId) {
        return res.status(400).json({ message: 'userId and deckId are required' });
    }

    try {
        const existing = await prisma.favoriteDeck.findUnique({
            where: {
                userId_deckId: {
                    userId: Number(userId),
                    deckId: Number(deckId),
                },
            },
        });

        if (existing) {
            return res.status(409).json({ message: 'Deck is already in favorites' });
        }

        const newFavorite = await prisma.favoriteDeck.create({
            data: {
                userId: Number(userId),
                deckId: Number(deckId),
            },
        });

        return res.status(201).json(newFavorite);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding favorite deck' });
    }
};

// DELETE /api/favorite-decks (userId + deckId in body)
export const removeFavoriteDeck = async (req: Request, res: Response) => {
    const { userId, deckId } = req.body;

    if (!userId || !deckId) {
        return res.status(400).json({ message: 'userId and deckId are required' });
    }

    try {
        await prisma.favoriteDeck.delete({
            where: {
                userId_deckId: {
                    userId: Number(userId),
                    deckId: Number(deckId),
                },
            },
        });

        return res
            .status(200)
            .json({ message: `Deck ${deckId} removed from favorites for user ${userId}` });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        console.error(error);
        return res.status(500).json({ message: 'Error removing favorite deck' });
    }
};
