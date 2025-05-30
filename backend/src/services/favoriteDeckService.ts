import * as repo from '../repositories/favoriteDeckRepository';

export const getFavorites = async (userId: number) => {
    return repo.findFavoritesByUser(userId);
};

export const addFavorite = async (userId: number, deckId: number) => {
    const existing = await repo.findOne(userId, deckId);
    if (existing) throw new Error('ALREADY_EXISTS');

    return repo.create(userId, deckId);
};

export const removeFavorite = async (userId: number, deckId: number) => {
    try {
        return await repo.remove(userId, deckId);
    } catch (e: any) {
        if (e.code === 'P2025') throw new Error('NOT_FOUND');
        throw e;
    }
};
