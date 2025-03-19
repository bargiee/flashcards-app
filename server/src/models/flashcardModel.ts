export interface Flashcard {
    id: number;
    deckId: number;
    front: string;
    back: string;
}

export let dummyFlashcards: Flashcard[] = [
    { id: 1, deckId: 1, front: 'Hello', back: 'Cześć' },
    { id: 2, deckId: 1, front: 'Dog', back: 'Pies' },
    { id: 3, deckId: 2, front: 'Cat', back: 'Kot' },
];
