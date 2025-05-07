import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import api from '../api';
import LibraryCard from '../components/LibraryCard';
import NavBar from '../components/NavBar';

interface Deck {
    id: number;
    name: string;
    createdAt: string;
    flashcards: { id: number }[];
    updatedAt: string;
}

export default function LibraryPage() {
    const [decks, setDecks] = useState<Deck[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get<Deck[]>('/decks');
                setDecks(data);
            } catch (err) {
                console.error(err);
            }
        })();
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
                        lastReviewed={deck.updatedAt}
                        onClick={() => navigate(`/sets/${deck.id}`)}
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
