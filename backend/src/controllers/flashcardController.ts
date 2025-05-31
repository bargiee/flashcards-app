import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';
import * as service from '../services/flashcardService';

export const getAllFlashcards = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    try {
        const flashcards = await service.getAll(userId);
        return res.status(200).json(flashcards);
    } catch (error) {
        return next(error);
    }
};

export const getFlashcardById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);
    try {
        const card = await service.getById(userId, id);
        if (!card) {
            return next(new HttpError(404, 'Flashcard not found'));
        }
        return res.status(200).json(card);
    } catch (error) {
        return next(error);
    }
};

export const createFlashcard = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    const { deckId, term, definition } = req.body;

    if (!deckId || !term || !definition) {
        return next(new HttpError(400, 'deckId, term and definition are required'));
    }

    try {
        const card = await service.create(userId, deckId, term, definition);
        if (!card) {
            return next(new HttpError(404, 'Deck not found'));
        }
        return res.status(201).json(card);
    } catch (error) {
        return next(error);
    }
};

export const updateFlashcard = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);
    const { term, definition } = req.body;

    try {
        const updated = await service.update(userId, id, term, definition);
        if (!updated) {
            return next(new HttpError(404, 'Flashcard not found'));
        }
        return res.status(200).json(updated);
    } catch (error) {
        return next(error);
    }
};

export const deleteFlashcard = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);

    try {
        const removed = await service.remove(userId, id);
        if (!removed) {
            return next(new HttpError(404, 'Flashcard not found'));
        }
        return res.status(200).json({ message: `Flashcard ${id} deleted` });
    } catch (error) {
        return next(error);
    }
};
