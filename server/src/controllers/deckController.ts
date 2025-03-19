import { Request, Response } from 'express';
import { dummyDecks, Deck } from '../models/deckModel';

export const getAllDecks = (req: Request, res: Response) => {
    return res.status(200).json(dummyDecks);
};

export const getDeckById = (req: Request, res: Response) => {
    const deckId = Number(req.params.id);
    const deck = dummyDecks.find((d) => d.id === deckId);

    if (!deck) {
        return res.status(404).json({ message: 'Deck not found' });
    }

    return res.status(200).json(deck);
};

export const createDeck = (req: Request, res: Response) => {
    const { userId, name, description } = req.body;

    if (!userId || !name) {
        return res.status(400).json({ message: 'userId and name are required' });
    }

    const newId = dummyDecks.length > 0 ? dummyDecks[dummyDecks.length - 1].id + 1 : 1;

    const newDeck: Deck = {
        id: newId,
        userId: Number(userId),
        name,
        description,
    };

    dummyDecks.push(newDeck);
    return res.status(201).json(newDeck);
};

export const updateDeck = (req: Request, res: Response) => {
    const deckId = Number(req.params.id);
    const { name, description } = req.body;

    const index = dummyDecks.findIndex((d) => d.id === deckId);
    if (index === -1) {
        return res.status(404).json({ message: 'Deck not found' });
    }

    dummyDecks[index] = {
        ...dummyDecks[index],
        name: name ?? dummyDecks[index].name,
        description: description ?? dummyDecks[index].description,
    };

    return res.status(200).json(dummyDecks[index]);
};

export const deleteDeck = (req: Request, res: Response) => {
    const deckId = Number(req.params.id);
    const index = dummyDecks.findIndex((d) => d.id === deckId);

    if (index === -1) {
        return res.status(404).json({ message: 'Deck not found' });
    }

    dummyDecks.splice(index, 1);
    return res.status(200).json({ message: `Deck with id ${deckId} deleted` });
};
