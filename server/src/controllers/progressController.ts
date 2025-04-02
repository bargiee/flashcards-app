import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/progress/user/:userId
export const getProgressByUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);

    try {
        const progress = await prisma.progress.findMany({
            where: { userId },
            include: { flashcard: true },
        });

        if (!progress.length) {
            return res.status(404).json({ message: 'No progress found for this user' });
        }

        return res.status(200).json(progress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching progress' });
    }
};

// POST /api/progress
export const createOrUpdateProgress = async (req: Request, res: Response) => {
    const { userId, flashcardId, success } = req.body;

    if (userId == null || flashcardId == null || success == null) {
        return res.status(400).json({ message: 'userId, flashcardId, and success are required' });
    }

    try {
        const existing = await prisma.progress.findFirst({
            where: {
                userId: Number(userId),
                flashcardId: Number(flashcardId),
            },
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
                    userId: Number(userId),
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
    const progressId = Number(req.params.id);

    try {
        await prisma.progress.delete({
            where: { id: progressId },
        });

        return res.status(200).json({ message: `Progress with id ${progressId} deleted` });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Progress not found' });
        }

        console.error(error);
        return res.status(500).json({ message: 'Error deleting progress' });
    }
};
