export interface FavoriteDeck {
    userId: number;
    deckId: number;
}

export let dummyFavoriteDecks: FavoriteDeck[] = [
    { userId: 1, deckId: 1 },
    { userId: 1, deckId: 2 },
    { userId: 2, deckId: 1 },
];
