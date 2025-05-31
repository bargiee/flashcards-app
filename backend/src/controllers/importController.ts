import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';
import * as service from '../services/importService';

export const importFlashcards = async (req: Request, res: Response, next: NextFunction) => {
    const { csv, deckId } = req.body;

    if (!csv || !deckId) {
        return next(new HttpError(400, 'csv and deckId are required'));
    }

    try {
        await service.queueImport(csv, deckId);
        return res.status(200).json({ message: 'Import queued successfully' });
    } catch (err) {
        return next(err);
    }
};
