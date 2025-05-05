import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/decks
export const getAllDecks = async (req: Request, res: Response) => {
    try {
        const decks = await prisma.deck.findMany({
            include: {
                flashcards: {
                    select: { id: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.status(200).json(decks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting decks' });
    }
};

// GET /api/decks/:id
export const getDeckById = async (req: Request, res: Response) => {
    const deckId = Number(req.params.id);
    try {
        const deck = await prisma.deck.findUnique({
            where: { id: deckId },
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
    const { userId, name, description } = req.body;

    if (!userId || !name) {
        return res.status(400).json({ message: 'userId and name are required' });
    }

    try {
        const newDeck = await prisma.deck.create({
            data: {
                userId: Number(userId),
                name,
                description,
            },
        });

        return res.status(201).json(newDeck);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating deck' });
    }
};

// PUT /api/decks/:id
export const updateDeck = async (req: Request, res: Response) => {
    const deckId = Number(req.params.id);
    const { name, description } = req.body;

    try {
        const existingDeck = await prisma.deck.findUnique({ where: { id: deckId } });

        if (!existingDeck) {
            return res.status(404).json({ message: 'Deck not found' });
        }

        const updatedDeck = await prisma.deck.update({
            where: { id: deckId },
            data: {
                name: name ?? existingDeck.name,
                description: description ?? existingDeck.description,
            },
        });

        return res.status(200).json(updatedDeck);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating deck' });
    }
};

// DELETE /api/decks/:id
export const deleteDeck = async (req: Request, res: Response) => {
    const deckId = Number(req.params.id);

    try {
        const existingDeck = await prisma.deck.findUnique({ where: { id: deckId } });

        if (!existingDeck) {
            return res.status(404).json({ message: 'Deck not found' });
        }

        await prisma.deck.delete({ where: { id: deckId } });
        return res.status(200).json({ message: `Deck with id ${deckId} deleted` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting deck' });
    }
};

// GET /api/decks/:id/flashcards
export const getFlashcardsForDeck = async (req: Request, res: Response) => {
    const deckId = Number(req.params.id);

    try {
        const flashcards = await prisma.flashcard.findMany({
            where: { deckId },
        });

        if (!flashcards || flashcards.length === 0) {
            return res.status(404).json({ message: 'No flashcards found for this deck' });
        }

        return res.status(200).json(flashcards);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching flashcards for deck' });
    }
};
