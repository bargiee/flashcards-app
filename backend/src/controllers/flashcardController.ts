import { Request, Response } from 'express';
import * as service from '../services/flashcardService';

export const getAllFlashcards = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    try {
        const flashcards = await service.getAll(userId);
        return res.status(200).json(flashcards);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error getting flashcards' });
    }
};

export const getFlashcardById = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);
    try {
        const card = await service.getById(userId, id);
        if (!card) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        return res.status(200).json(card);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching flashcard' });
    }
};

export const createFlashcard = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { deckId, term, definition } = req.body;
    if (!deckId || !term || !definition) {
        return res.status(400).json({ message: 'deckId, term and definition are required' });
    }

    try {
        const card = await service.create(userId, deckId, term, definition);
        if (!card) {
            return res.status(404).json({ message: 'Deck not found' });
        }
        return res.status(201).json(card);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating flashcard' });
    }
};

export const updateFlashcard = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);
    const { term, definition } = req.body;

    try {
        const updated = await service.update(userId, id, term, definition);
        if (!updated) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        return res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating flashcard' });
    }
};

export const deleteFlashcard = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);

    try {
        const removed = await service.remove(userId, id);
        if (!removed) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        return res.status(200).json({ message: `Flashcard ${id} deleted` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting flashcard' });
    }
};
