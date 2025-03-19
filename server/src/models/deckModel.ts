export interface Deck {
    id: number;
    userId: number;
    name: string;
    description?: string;
}

export let dummyDecks: Deck[] = [
    { id: 1, userId: 1, name: 'English', description: 'Basic verbs' },
    { id: 2, userId: 2, name: 'Animals', description: 'Animals' },
];
