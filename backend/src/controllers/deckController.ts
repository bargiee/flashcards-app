import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/decks
export const getAllDecks = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    try {
        const decks = await prisma.deck.findMany({
            where: { userId },
            include: { flashcards: { select: { id: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json(decks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting decks' });
    }
};

// GET /api/decks/:id
export const getDeckById = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const deckId = Number(req.params.id);

    try {
        const deck = await prisma.deck.findFirst({
            where: { id: deckId, userId },
            include: { flashcards: { select: { id: true } } },
        });
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' });
        }
        return res.status(200).json(deck);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving deck' });
    }
};

// POST /api/decks
export const createDeck = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const newDeck = await prisma.deck.create({
            data: { userId, name, description },
        });
        return res.status(201).json(newDeck);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating deck' });
    }
};

// PUT /api/decks/:id
export const updateDeck = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const deckId = Number(req.params.id);
    const { name, description } = req.body;

    try {
        const existing = await prisma.deck.findFirst({ where: { id: deckId, userId } });
        if (!existing) {
            return res.status(404).json({ message: 'Deck not found' });
        }
        const updated = await prisma.deck.update({
            where: { id: deckId },
            data: {
                name: name ?? existing.name,
                description: description ?? existing.description,
            },
        });
        return res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating deck' });
    }
};

// DELETE /api/decks/:id
export const deleteDeck = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const deckId = Number(req.params.id);

    try {
        const existing = await prisma.deck.findFirst({ where: { id: deckId, userId } });
        if (!existing) {
            return res.status(404).json({ message: 'Deck not found' });
        }
        await prisma.deck.delete({ where: { id: deckId } });
        return res.status(200).json({ message: `Deck ${deckId} deleted` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting deck' });
    }
};

// GET /api/decks/:id/flashcards
export const getFlashcardsForDeck = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const deckId = Number(req.params.id);

    try {
        const deck = await prisma.deck.findFirst({ where: { id: deckId, userId } });
        if (!deck) {
            return res.status(404).json({ message: 'Deck not found' });
        }
        const flashcards = await prisma.flashcard.findMany({ where: { deckId } });
        return res.status(200).json(flashcards);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching flashcards' });
    }
};
