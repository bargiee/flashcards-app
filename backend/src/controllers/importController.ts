import { Request, Response } from 'express';
import * as service from '../services/importService';

export const importFlashcards = async (req: Request, res: Response) => {
    const { csv, deckId } = req.body;

    if (!csv || !deckId) {
        return res.status(400).json({ message: 'csv and deckId are required' });
    }

    try {
        await service.queueImport(csv, deckId);
        res.status(200).json({ message: 'Import queued successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to queue import' });
    }
};
