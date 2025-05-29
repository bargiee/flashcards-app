import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

// GET /api/progress/user
export const getProgressByUser = async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    try {
        const prog = await prisma.progress.findMany({
            where: { userId },
            include: {
                flashcard: {
                    select: { deckId: true },
                },
            },
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
    const { flashcardId, known } = req.body;

    if (flashcardId == null || typeof known !== 'boolean') {
        return res
            .status(400)
            .json({ message: '`flashcardId` (number) i `known` (boolean) są wymagane' });
    }

    try {
        const existing = await prisma.progress.findFirst({
            where: { userId, flashcardId: Number(flashcardId) },
        });

        if (existing) {
            await prisma.progress.update({
                where: { id: existing.id },
                data: {
                    reviewCount: { increment: 1 },
                    successCount: known ? { increment: 1 } : undefined,
                    failCount: !known ? { increment: 1 } : undefined,
                    lastReviewed: new Date(),
                },
            });
        } else {
            await prisma.progress.create({
                data: {
                    userId,
                    flashcardId: Number(flashcardId),
                    reviewCount: 1,
                    successCount: known ? 1 : 0,
                    failCount: known ? 0 : 1,
                },
            });
        }

        return res.sendStatus(204);
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
