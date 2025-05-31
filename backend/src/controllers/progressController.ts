import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/HttpError';
import * as service from '../services/progressService';

export const getProgressByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user as any).id;
        const progress = await service.getUserProgress(userId);
        return res.status(200).json(progress);
    } catch (e) {
        return next(e);
    }
};

export const createOrUpdateProgress = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    const { flashcardId, known } = req.body;

    if (flashcardId == null || typeof known !== 'boolean') {
        return next(new HttpError(400, 'flashcardId and boolean value are required'));
    }

    try {
        await service.createOrUpdate(userId, Number(flashcardId), known);
        return res.sendStatus(204);
    } catch (e) {
        return next(e);
    }
};

export const deleteProgress = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);

    try {
        await service.deleteProgress(userId, id);
        return res.status(200).json({ message: `Progress ${id} deleted` });
    } catch (e: any) {
        if (e.message === 'NOT_FOUND') {
            return next(new HttpError(404, 'Progress not found'));
        }
        return next(e);
    }
};
