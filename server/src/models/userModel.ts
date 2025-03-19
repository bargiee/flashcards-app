interface User {
    id: number;
    username: string;
    email: string;
}

const dummyUsers: User[] = [
    { id: 1, username: 'Jan', email: 'jan@example.com' },
    { id: 2, username: 'Maria', email: 'maria@example.com' },
];

export { User, dummyUsers };
