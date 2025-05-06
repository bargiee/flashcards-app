import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/flashcards
export const getAllFlashcards = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    try {
        const flashcards = await prisma.flashcard.findMany({
            where: { deck: { userId } },
        });
        return res.status(200).json(flashcards);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting flashcards' });
    }
};

// GET /api/flashcards/:id
export const getFlashcardById = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);
    try {
        const card = await prisma.flashcard.findFirst({
            where: { id, deck: { userId } },
        });
        if (!card) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        return res.status(200).json(card);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching flashcard' });
    }
};

// POST /api/flashcards
export const createFlashcard = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { deckId, term, definition } = req.body;
    if (!deckId || !term || !definition) {
        return res.status(400).json({ message: 'deckId, term and definition are required' });
    }
    const deck = await prisma.deck.findFirst({ where: { id: Number(deckId), userId } });
    if (!deck) {
        return res.status(404).json({ message: 'Deck not found' });
    }

    try {
        const card = await prisma.flashcard.create({
            data: { deckId: Number(deckId), term, definition },
        });
        return res.status(201).json(card);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating flashcard' });
    }
};

// PUT /api/flashcards/:id
export const updateFlashcard = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);
    const { term, definition } = req.body;

    try {
        const existing = await prisma.flashcard.findFirst({
            where: { id, deck: { userId } },
        });
        if (!existing) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        const updated = await prisma.flashcard.update({
            where: { id },
            data: {
                term: term ?? existing.term,
                definition: definition ?? existing.definition,
            },
        });
        return res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating flashcard' });
    }
};

// DELETE /api/flashcards/:id
export const deleteFlashcard = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);

    try {
        const existing = await prisma.flashcard.findFirst({
            where: { id, deck: { userId } },
        });
        if (!existing) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        await prisma.flashcard.delete({ where: { id } });
        return res.status(200).json({ message: `Flashcard ${id} deleted` });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting flashcard' });
    }
};
