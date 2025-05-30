import * as repo from '../repositories/flashcardRepository';

export const getAll = (userId: number) => repo.findAllByUser(userId);

export const getById = (userId: number, id: number) => repo.findOne(userId, id);

export const create = async (userId: number, deckId: number, term: string, definition: string) => {
    const deck = await repo.findDeck(deckId, userId);
    if (!deck) return null;
    return repo.create(deckId, term, definition);
};

export const update = async (userId: number, id: number, term?: string, definition?: string) => {
    const existing = await repo.findOne(userId, id);
    if (!existing) return null;
    return repo.update(id, term ?? existing.term, definition ?? existing.definition);
};

export const remove = async (userId: number, id: number) => {
    const existing = await repo.findOne(userId, id);
    if (!existing) return false;
    await repo.remove(id);
    return true;
};
