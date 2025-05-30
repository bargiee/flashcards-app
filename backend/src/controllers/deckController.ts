import { Request, Response } from 'express';
import * as service from '../services/deckService';

const toNum = (id: string) => Number(id);

export const getAllDecks = async (req: Request, res: Response) => {
    try {
        const decks = await service.listDecks((req.user as any).id);
        return res.status(200).json(decks);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error getting decks' });
    }
};

export const getDeckById = async (req: Request, res: Response) => {
    try {
        const deck = await service.getDeck((req.user as any).id, toNum(req.params.id));
        return res.status(200).json(deck);
    } catch (err: any) {
        if (err.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Deck not found' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Error retrieving deck' });
    }
};

export const createDeck = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    try {
        const newDeck = await service.createDeck((req.user as any).id, name, description);
        return res.status(201).json(newDeck);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating deck' });
    }
};

export const updateDeck = async (req: Request, res: Response) => {
    try {
        await service.updateDeck((req.user as any).id, toNum(req.params.id), req.body);
        return res.status(204).send();
    } catch (err: any) {
        if (err.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Deck not found' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Failed to update deck' });
    }
};

export const deleteDeck = async (req: Request, res: Response) => {
    try {
        await service.deleteDeck((req.user as any).id, toNum(req.params.id));
        return res.status(200).json({ message: `Deck ${req.params.id} deleted` });
    } catch (err: any) {
        if (err.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Deck not found' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Error deleting deck' });
    }
};

export const getFlashcardsForDeck = async (req: Request, res: Response) => {
    try {
        const cards = await service.listFlashcards((req.user as any).id, toNum(req.params.id));
        return res.status(200).json(cards);
    } catch (err: any) {
        if (err.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Deck not found' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Error fetching flashcards' });
    }
};
