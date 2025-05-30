import { Request, Response } from 'express';
import * as service from '../services/progressService';

export const getProgressByUser = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any).id;
        const progress = await service.getUserProgress(userId);
        res.status(200).json(progress);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error fetching progress' });
    }
};

export const createOrUpdateProgress = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { flashcardId, known } = req.body;

    if (flashcardId == null || typeof known !== 'boolean') {
        return res.status(400).json({ message: 'flashcardId and boolean value are required' });
    }

    try {
        await service.createOrUpdate(userId, Number(flashcardId), known);
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error creating/updating progress' });
    }
};

export const deleteProgress = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);

    try {
        await service.deleteProgress(userId, id);
        res.status(200).json({ message: `Progress ${id} deleted` });
    } catch (e: any) {
        if (e.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Progress not found' });
        }
        console.error(e);
        res.status(500).json({ message: 'Error deleting progress' });
    }
};
