import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import LibraryCard from '../components/LibraryCard';
import NavBar from '../components/NavBar';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { HiArrowsUpDown } from 'react-icons/hi2';

interface Deck {
    id: number;
    name: string;
    createdAt: string;
    flashcards: { id: number; deckId: number }[];
    updatedAt: string;
}

interface ProgressEntry {
    flashcard: {
        deckId: number;
    };
    lastReviewed: string;
}

export default function LibraryPage() {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [progress, setProgress] = useState<ProgressEntry[]>([]);
    const [isSorted, setIsSorted] = useState(false);
    const [sortAsc, setSortAsc] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get<Deck[]>('/decks');
                setDecks(data);
            } catch {
                toast.error('Error fetching data');
            }
        })();

        (async () => {
            try {
                const { data } = await api.get<ProgressEntry[]>('/progress/user');
                setProgress(data);
            } catch {
                toast.error('Error fetching data');
            }
        })();
    }, []);

    const getLastReviewedDate = (deckId: number): string | null => {
        const dates = progress
            .filter((p) => p.flashcard.deckId === deckId)
            .map((p) => p.lastReviewed);

        if (!dates.length) return null;

        return dates.reduce((latest, cur) => (new Date(cur) > new Date(latest) ? cur : latest));
    };

    const sortDecksByDate = () => {
        const getLast = (deckId: number): number => {
            const relevant = progress
                .filter((p) => p.flashcard.deckId === deckId)
                .map((p) => new Date(p.lastReviewed).getTime());
            return relevant.length ? Math.max(...relevant) : 0;
        };

        const sorted = [...decks].sort((a, b) => {
            const aLast = getLast(a.id);
            const bLast = getLast(b.id);
            return sortAsc ? aLast - bLast : bLast - aLast;
        });

        setDecks(sorted);
        setSortAsc((prev) => !prev);
        setIsSorted(true);
    };

    return (
        <>
            <NavBar />
            <div className="max-w-5xl mx-auto px-4 mt-10 2xl:mt-20 mb-20">
                <div className="flex items-center justify-between mb-14">
                    <h1 className="text-2xl font-medium border-b-4 border-black inline-block font-museo">
                        Your library
                    </h1>
                    <button
                        onClick={sortDecksByDate}
                        className="ml-4 flex gap-1 items-center text-sm font-normal text-black hover:text-yellow-500"
                    >
                        Sort by last reviewed
                        {!isSorted ? <HiArrowsUpDown /> : sortAsc ? <BsArrowDown /> : <BsArrowUp />}
                    </button>
                </div>

                {decks.map((deck) => (
                    <LibraryCard
                        key={deck.id}
                        title={deck.name}
                        termsCount={deck.flashcards?.length || 0}
                        lastReviewed={getLastReviewedDate(deck.id) || 'Never reviewed'}
                        createdAt={deck.createdAt}
                        onClick={() => navigate(`/sets/${deck.id}`)}
                    />
                ))}

                <div className="flex justify-center mt-10">
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full text-lg"
                        onClick={() => (window.location.href = '/create')}
                    >
                        <FiPlus />
                    </button>
                </div>
            </div>
        </>
    );
}
