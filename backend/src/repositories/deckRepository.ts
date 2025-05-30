import prisma from '../config/prismaClient';

export const findAllByUser = (userId: number) =>
    prisma.deck.findMany({
        where: { userId },
        include: { flashcards: { select: { id: true } } },
        orderBy: { createdAt: 'desc' },
    });

export const findByIdAndUser = (id: number, userId: number) =>
    prisma.deck.findFirst({
        where: { id, userId },
        include: {
            flashcards: {
                select: { id: true, term: true, definition: true },
            },
        },
    });

export const create = (userId: number, name: string, description?: string) =>
    prisma.deck.create({
        data: { userId, name, description },
    });

export const update = (id: number, data: Partial<{ name: string }>, tx = prisma) =>
    tx.deck.update({
        where: { id },
        data,
    });

export const remove = (id: number) =>
    prisma.$transaction([
        prisma.flashcard.deleteMany({ where: { deckId: id } }),
        prisma.deck.delete({ where: { id } }),
    ]);

export const findFlashcards = (deckId: number) => prisma.flashcard.findMany({ where: { deckId } });
