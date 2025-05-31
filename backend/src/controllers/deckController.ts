import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/HttpError';
import * as service from '../services/deckService';

const toNum = (id: string) => Number(id);

export const getAllDecks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decks = await service.listDecks((req.user as any).id);
        return res.status(200).json(decks);
    } catch (err) {
        next(err);
    }
};

export const getDeckById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deck = await service.getDeck((req.user as any).id, toNum(req.params.id));
        return res.status(200).json(deck);
    } catch (err: any) {
        if (err.message === 'NOT_FOUND') {
            return next(new HttpError(404, 'Deck not found'));
        }
        next(err);
    }
};

export const createDeck = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    if (!name) {
        return next(new HttpError(400, 'Name is required'));
    }

    try {
        const newDeck = await service.createDeck((req.user as any).id, name, description);
        return res.status(201).json(newDeck);
    } catch (err) {
        next(err);
    }
};

export const updateDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await service.updateDeck((req.user as any).id, toNum(req.params.id), req.body);
        return res.status(204).send();
    } catch (err: any) {
        if (err.message === 'NOT_FOUND') {
            return next(new HttpError(404, 'Deck not found'));
        }
        next(err);
    }
};

export const deleteDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await service.deleteDeck((req.user as any).id, toNum(req.params.id));
        return res.status(200).json({ message: `Deck ${req.params.id} deleted` });
    } catch (err: any) {
        if (err.message === 'NOT_FOUND') {
            return next(new HttpError(404, 'Deck not found'));
        }
        next(err);
    }
};

export const getFlashcardsForDeck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cards = await service.listFlashcards((req.user as any).id, toNum(req.params.id));
        return res.status(200).json(cards);
    } catch (err: any) {
        if (err.message === 'NOT_FOUND') {
            return next(new HttpError(404, 'Deck not found'));
        }
        next(err);
    }
};
