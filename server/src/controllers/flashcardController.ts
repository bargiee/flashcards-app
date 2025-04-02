import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/flashcards
export const getAllFlashcards = async (req: Request, res: Response) => {
    try {
        const flashcards = await prisma.flashcard.findMany();
        return res.status(200).json(flashcards);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting flashcards' });
    }
};

// GET /api/flashcards/:id
export const getFlashcardById = async (req: Request, res: Response) => {
    const flashcardId = Number(req.params.id);
    try {
        const flashcard = await prisma.flashcard.findUnique({
            where: { id: flashcardId },
        });

        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        return res.status(200).json(flashcard);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching flashcard' });
    }
};

// POST /api/flashcards
export const createFlashcard = async (req: Request, res: Response) => {
    const { deckId, term, definition } = req.body;

    if (!deckId || !term || !definition) {
        return res.status(400).json({ message: 'deckId, term and definition are required' });
    }

    try {
        const newFlashcard = await prisma.flashcard.create({
            data: {
                deckId: Number(deckId),
                term,
                definition,
            },
        });

        return res.status(201).json(newFlashcard);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating flashcard' });
    }
};

// PUT /api/flashcards/:id
export const updateFlashcard = async (req: Request, res: Response) => {
    const flashcardId = Number(req.params.id);
    const { term, definition, deckId } = req.body;

    try {
        const existing = await prisma.flashcard.findUnique({
            where: { id: flashcardId },
        });

        if (!existing) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        const updated = await prisma.flashcard.update({
            where: { id: flashcardId },
            data: {
                term: term ?? existing.term,
                definition: definition ?? existing.definition,
                deckId: deckId ?? existing.deckId,
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
    const flashcardId = Number(req.params.id);

    try {
        await prisma.flashcard.delete({
            where: { id: flashcardId },
        });

        return res.status(200).json({ message: `Flashcard with id ${flashcardId} deleted` });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        console.error(error);
        return res.status(500).json({ message: 'Error deleting flashcard' });
    }
};
