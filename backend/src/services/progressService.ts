import * as repo from '../repositories/progressRepository';

export const getUserProgress = async (userId: number) => {
    return repo.findAllByUser(userId);
};

export const createOrUpdate = async (userId: number, flashcardId: number, known: boolean) => {
    const existing = await repo.findOne(userId, flashcardId);

    if (existing) {
        return repo.update(existing.id, known);
    } else {
        return repo.create(userId, flashcardId, known);
    }
};

export const deleteProgress = async (userId: number, id: number) => {
    const existing = await repo.findByIdAndUser(id, userId);
    if (!existing) throw new Error('NOT_FOUND');

    return repo.remove(id);
};

export const resetDeck = async (userId: number, deckId: number) => {
    const deck = await repo.findByIdAndUser(deckId, userId);
    if (!deck) throw new Error('NOT_FOUND');
    return repo.removeByDeck(userId, deckId);
};
