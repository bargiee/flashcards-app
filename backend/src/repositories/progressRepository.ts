import prisma from '../config/prismaClient';

export const findAllByUser = (userId: number) =>
    prisma.progress.findMany({
        where: { userId },
        include: {
            flashcard: { select: { deckId: true } },
        },
    });

export const findOne = (userId: number, flashcardId: number) =>
    prisma.progress.findFirst({
        where: { userId, flashcardId },
    });

export const update = (id: number, known: boolean) =>
    prisma.progress.update({
        where: { id },
        data: {
            reviewCount: { increment: 1 },
            successCount: known ? { increment: 1 } : undefined,
            failCount: !known ? { increment: 1 } : undefined,
            lastReviewed: new Date(),
        },
    });

export const create = (userId: number, flashcardId: number, known: boolean) =>
    prisma.progress.create({
        data: {
            userId,
            flashcardId,
            reviewCount: 1,
            successCount: known ? 1 : 0,
            failCount: known ? 0 : 1,
        },
    });

export const findByIdAndUser = (id: number, userId: number) =>
    prisma.progress.findFirst({ where: { id, userId } });

export const remove = (id: number) => prisma.progress.delete({ where: { id } });
