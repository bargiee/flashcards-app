import prisma from '../config/prismaClient';

export const findFavoritesByUser = (userId: number) =>
    prisma.favoriteDeck.findMany({
        where: { userId },
        include: {
            deck: {
                include: {
                    flashcards: { select: { id: true } },
                },
            },
        },
    });

export const findOne = (userId: number, deckId: number) =>
    prisma.favoriteDeck.findUnique({
        where: { userId_deckId: { userId, deckId } },
    });

export const create = (userId: number, deckId: number) =>
    prisma.favoriteDeck.create({
        data: { userId, deckId },
    });

export const remove = (userId: number, deckId: number) =>
    prisma.favoriteDeck.delete({
        where: { userId_deckId: { userId, deckId } },
    });
