import prisma from '../config/prismaClient';
import { Prisma, PrismaClient } from '@prisma/client';

export const findAllByUser = (userId: number) =>
    prisma.flashcard.findMany({ where: { deck: { userId } } });

export const findOne = (userId: number, flashcardId: number) =>
    prisma.flashcard.findFirst({ where: { id: flashcardId, deck: { userId } } });

export const findDeck = (deckId: number, userId: number) =>
    prisma.deck.findFirst({ where: { id: deckId, userId } });

export const create = (deckId: number, term: string, definition: string) =>
    prisma.flashcard.create({ data: { deckId, term, definition } });

export const update = (id: number, term: string, definition: string) =>
    prisma.flashcard.update({ where: { id }, data: { term, definition } });

export const remove = (id: number) => prisma.flashcard.delete({ where: { id } });
