import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/progress/user/:userId
export const getProgressByUser = async (_req: Request, res: Response) => {
    const userId = (_req.user as any).id;
    try {
        const prog = await prisma.progress.findMany({
            where: { userId },
            include: { flashcard: true },
        });
        return res.status(200).json(prog);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching progress' });
    }
};

// POST /api/progress
export const createOrUpdateProgress = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { flashcardId, success } = req.body;
    if (flashcardId == null || success == null) {
        return res.status(400).json({ message: 'flashcardId and success are required' });
    }

    try {
        const existing = await prisma.progress.findFirst({
            where: { userId, flashcardId: Number(flashcardId) },
        });

        if (existing) {
            const updated = await prisma.progress.update({
                where: { id: existing.id },
                data: {
                    reviewCount: existing.reviewCount + 1,
                    successCount: existing.successCount + (success ? 1 : 0),
                    failCount: existing.failCount + (!success ? 1 : 0),
                    lastReviewed: new Date(),
                },
            });
            return res.status(200).json(updated);
        } else {
            const created = await prisma.progress.create({
                data: {
                    userId,
                    flashcardId: Number(flashcardId),
                    reviewCount: 1,
                    successCount: success ? 1 : 0,
                    failCount: success ? 0 : 1,
                },
            });
            return res.status(201).json(created);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating/updating progress' });
    }
};

// DELETE /api/progress/:id
export const deleteProgress = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const id = Number(req.params.id);

    try {
        const existing = await prisma.progress.findFirst({
            where: { id, userId },
        });
        if (!existing) {
            return res.status(404).json({ message: 'Progress not found' });
        }

        await prisma.progress.delete({ where: { id } });
        return res.status(200).json({ message: `Progress ${id} deleted` });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting progress' });
    }
};
