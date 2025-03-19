import { Request, Response } from 'express';
import { Flashcard, dummyFlashcards } from '../models/flashcardModel';

export const getAllFlashcards = (req: Request, res: Response) => {
    return res.status(200).json(dummyFlashcards);
};

export const getFlashcardById = (req: Request, res: Response) => {
    const flashcardId = Number(req.params.id);
    const flashcard = dummyFlashcards.find((f) => f.id === flashcardId);

    if (!flashcard) {
        return res.status(404).json({ message: 'Flashcard not found' });
    }

    return res.status(200).json(flashcard);
};

export const createFlashcard = (req: Request, res: Response) => {
    const { deckId, front, back } = req.body;

    if (!deckId || !front || !back) {
        return res.status(400).json({ message: 'deckId, front, and back are required' });
    }

    const newId = dummyFlashcards.length > 0 ? dummyFlashcards[dummyFlashcards.length - 1].id + 1 : 1;

    const newFlashcard: Flashcard = {
        id: newId,
        deckId: Number(deckId),
        front,
        back,
    };

    dummyFlashcards.push(newFlashcard);
    return res.status(201).json(newFlashcard);
};

export const updateFlashcard = (req: Request, res: Response) => {
    const flashcardId = Number(req.params.id);
    const { front, back, deckId } = req.body;

    const index = dummyFlashcards.findIndex((f) => f.id === flashcardId);
    if (index === -1) {
        return res.status(404).json({ message: 'Flashcard not found' });
    }

    dummyFlashcards[index] = {
        ...dummyFlashcards[index],
        front: front ?? dummyFlashcards[index].front,
        back: back ?? dummyFlashcards[index].back,
        deckId: deckId ?? dummyFlashcards[index].deckId,
    };

    return res.status(200).json(dummyFlashcards[index]);
};

export const deleteFlashcard = (req: Request, res: Response) => {
    const flashcardId = Number(req.params.id);
    const index = dummyFlashcards.findIndex((f) => f.id === flashcardId);

    if (index === -1) {
        return res.status(404).json({ message: 'Flashcard not found' });
    }

    dummyFlashcards.splice(index, 1);
    return res.status(200).json({ message: `Flashcard with id ${flashcardId} deleted` });
};
