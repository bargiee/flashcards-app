import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/favorite-decks/:userId
export const getFavoriteDecksByUser = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    try {
        const favs = await prisma.favoriteDeck.findMany({
            where: { userId },
            include: { deck: { include: { flashcards: { select: { id: true } } } } },
        });
        return res.status(200).json(favs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching favorites' });
    }
};

// POST /api/favorite-decks
export const addFavoriteDeck = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { deckId } = req.body;
    if (!deckId) {
        return res.status(400).json({ message: 'deckId is required' });
    }

    try {
        const existing = await prisma.favoriteDeck.findUnique({
            where: { userId_deckId: { userId, deckId: Number(deckId) } },
        });
        if (existing) {
            return res.status(409).json({ message: 'Already in favorites' });
        }
        const fav = await prisma.favoriteDeck.create({
            data: { userId, deckId: Number(deckId) },
        });
        return res.status(201).json(fav);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding favorite' });
    }
};

// DELETE /api/favorite-decks (userId + deckId in body)
export const removeFavoriteDeck = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { deckId } = req.body;
    if (!deckId) {
        return res.status(400).json({ message: 'deckId is required' });
    }

    try {
        await prisma.favoriteDeck.delete({
            where: { userId_deckId: { userId, deckId: Number(deckId) } },
        });
        return res.status(200).json({ message: 'Removed from favorites' });
    } catch (e: any) {
        if (e.code === 'P2025') {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        console.error(e);
        return res.status(500).json({ message: 'Error removing favorite' });
    }
};
