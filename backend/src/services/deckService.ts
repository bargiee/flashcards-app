import prisma from '../config/prismaClient';
import * as repo from '../repositories/deckRepository';
import { Prisma } from '@prisma/client';

export async function listDecks(userId: number) {
    return repo.findAllByUser(userId);
}

export async function getDeck(userId: number, deckId: number) {
    const deck = await repo.findByIdAndUser(deckId, userId);
    if (!deck) throw new Error('NOT_FOUND');
    return deck;
}

export async function createDeck(userId: number, name: string, description?: string) {
    if (!name.trim()) throw new Error('NAME_REQUIRED');
    return repo.create(userId, name.trim(), description);
}

export async function updateDeck(
    userId: number,
    deckId: number,
    body: { name?: string; flashcards?: { id?: number; term: string; definition: string }[] }
) {
    const { name, flashcards } = body;

    await getDeck(userId, deckId);

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        if (name !== undefined) {
            await tx.deck.update({
                where: { id: deckId },
                data: { name },
            });
        }

        if (Array.isArray(flashcards)) {
            const existing = await tx.flashcard.findMany({
                where: { deckId },
                select: { id: true },
            });
            const existingIds = existing.map((c: any) => c.id);

            const incomingIds = flashcards
                .filter((fc) => typeof fc.id === 'number')
                .map((fc) => fc.id!);

            await tx.flashcard.deleteMany({
                where: { deckId, id: { notIn: incomingIds } },
            });

            // upsert
            for (const fc of flashcards) {
                if (fc.id) {
                    await tx.flashcard.update({
                        where: { id: fc.id },
                        data: { term: fc.term, definition: fc.definition },
                    });
                } else {
                    await tx.flashcard.create({
                        data: { deckId, term: fc.term, definition: fc.definition },
                    });
                }
            }
        }
    });

    return repo.findByIdAndUser(deckId, userId);
}

export async function deleteDeck(userId: number, deckId: number) {
    await getDeck(userId, deckId);
    return repo.remove(deckId);
}

export async function listFlashcards(userId: number, deckId: number) {
    await getDeck(userId, deckId);
    return repo.findFlashcards(deckId);
}
