import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import NavBar from '../components/NavBar';
import LibraryCard from '../components/LibraryCard';
import RecentFlashcard from '../components/RecentFlashcard';
import toast from 'react-hot-toast';

interface Deck {
    id: number;
    name: string;
    createdAt: string;
    flashcards: { id: number; deckId: number }[];
}

interface ProgressEntry {
    flashcard: { deckId: number };
    lastReviewed: string;
    successCount: number;
    failCount: number;
}

export default function HomePage() {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [progress, setProgress] = useState<ProgressEntry[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const [deckRes, progRes, favRes] = await Promise.all([
                    api.get<Deck[]>('/decks'),
                    api.get<ProgressEntry[]>('/progress/user'),
                    api.get<{ deckId: number }[]>('/favorites'),
                ]);

                setDecks(deckRes.data);
                setProgress(progRes.data);
                setFavorites(favRes.data.map((f) => f.deckId));
            } catch (err) {
                toast.error('Error loading data.');
            }
        })();
    }, []);

    const lastReviewedAt = (deckId: number): number =>
        progress
            .filter((p) => p.flashcard.deckId === deckId)
            .reduce((latest, cur) => Math.max(latest, new Date(cur.lastReviewed).getTime()), 0);

    const accuracyOf = (deckId: number): number => {
        const stats = progress.filter((p) => p.flashcard.deckId === deckId);
        const known = stats.reduce((sum, p) => sum + p.successCount, 0);
        const total = stats.reduce((sum, p) => sum + p.successCount + p.failCount, 0);
        return total ? Math.round((known / total) * 100) : 0;
    };

    const recentDecks = useMemo(
        () =>
            [...decks]
                .filter((d) => lastReviewedAt(d.id))
                .sort((a, b) => lastReviewedAt(b.id) - lastReviewedAt(a.id))
                .slice(0, 6),
        [decks, progress]
    );

    const favoriteDecks = useMemo(
        () => decks.filter((d) => favorites.includes(d.id)),
        [decks, favorites]
    );
    return (
        <>
            <NavBar />
            <div className="max-w-5xl mx-auto px-4 mt-10 2xl:mt-20 mb-20">
                <section className="mb-16">
                    <h1 className="text-2xl font-medium border-b-4 border-black inline-block mb-14 font-museo">
                        Recents
                    </h1>

                    {recentDecks.length === 0 ? (
                        <p className="text-sm text-gray-500">No recent activity yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recentDecks.map((deck) => (
                                <RecentFlashcard
                                    key={deck.id}
                                    title={deck.name}
                                    percent={accuracyOf(deck.id)}
                                    onClick={() => navigate(`/sets/${deck.id}`)}
                                />
                            ))}
                        </div>
                    )}
                </section>
                <section>
                    <h1 className="text-2xl font-medium border-b-4 border-black inline-block mb-14 font-museo">
                        Favorites
                    </h1>

                    {favoriteDecks.length === 0 ? (
                        <p className="text-sm text-gray-500">You have no favorite sets yet.</p>
                    ) : (
                        favoriteDecks.map((deck) => (
                            <LibraryCard
                                key={deck.id}
                                title={deck.name}
                                termsCount={deck.flashcards.length}
                                lastReviewed={
                                    lastReviewedAt(deck.id)
                                        ? new Date(lastReviewedAt(deck.id)).toLocaleDateString()
                                        : 'Never reviewed'
                                }
                                createdAt={deck.createdAt}
                                onClick={() => navigate(`/sets/${deck.id}`)}
                            />
                        ))
                    )}
                </section>
            </div>
        </>
    );
}
