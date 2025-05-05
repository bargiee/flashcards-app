import { useEffect, useState } from 'react';
import axios from 'axios';
import LibraryCard from '../components/LibraryCard';
import NavBar from '../components/NavBar';
import { FaPlus } from 'react-icons/fa';

interface Deck {
    id: number;
    name: string;
    createdAt: string;
    flashcards: { id: number }[];
}

export default function LibraryPage() {
    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/decks');
                setDecks(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDecks();
    }, []);

    return (
        <>
            <NavBar />
            <div className="max-w-4xl mx-auto px-4 mt-20 mb-20">
                <h1 className="text-2xl font-medium border-b-4 border-black inline-block mb-14 font-museo">
                    Your library
                </h1>

                {decks.map((deck) => (
                    <LibraryCard
                        key={deck.id}
                        title={deck.name}
                        termsCount={deck.flashcards?.length || 0}
                        lastReviewed="2 days ago" // todo
                    />
                ))}

                <div className="flex justify-center mt-10">
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full text-lg"
                        onClick={() => (window.location.href = '/create')}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
        </>
    );
}
