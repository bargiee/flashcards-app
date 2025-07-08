import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { FaEdit, FaStar } from 'react-icons/fa';
import { TbCardsFilled } from 'react-icons/tb';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar';

interface Flashcard {
    id: number;
    term: string;
    definition: string;
}

export default function FlashcardSetEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accuracy, setAccuracy] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/decks/${id}`);
                setName(data.name);
                setCards(data.flashcards ?? []);
            } catch {
                toast.error('Could not load deck');
                navigate('/library');
            } finally {
                setLoading(false);
            }
        })();
    }, [id, navigate]);

    useEffect(() => {
        (async () => {
            if (!id) return;
            try {
                const { data } = await api.get('/favorites');
                const isFav = data.some((fav: any) => Number(fav.deckId) === Number(id));
                setIsFavorite(isFav);
            } catch (err) {
                toast.error('Error fetching data');
            }
        })();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        (async () => {
            try {
                const { data } = await api.get('/progress/user');
                const stats = data.filter((p: any) => p.flashcard.deckId === Number(id));

                const known = stats.reduce((s: number, p: any) => s + p.successCount, 0);
                const total = stats.reduce(
                    (s: number, p: any) => s + p.successCount + p.failCount,
                    0
                );

                setAccuracy(total ? Math.round((known / total) * 100) : 0);
            } catch (err) {
                toast.error('Error loading progress');
                setAccuracy(null);
            }
        })();
    }, [id]);

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await api.delete('/favorites', { data: { deckId: id } });
                toast.success('Removed from favorites');
            } else {
                await api.post('/favorites', { deckId: id });
                toast.success('Added to favorites');
            }
            setIsFavorite((prev) => !prev);
        } catch {
            toast.error('Error updating favorites');
        }
    };

    return (
        <>
            <NavBar />
            <div className="max-w-4xl mx-auto px-4 py-10 mt-20 mb-20">
                <Link to="/library" className="text-md text-gray-400 hover:text-black block">
                    &lt; back to library
                </Link>

                <div className="sticky top-0 z-10 bg-white pt-4 pb-6 -mx-4 px-4 mb-10">
                    <div className="bg-black text-white rounded-xl flex items-center justify-between pl-6 pr-4 py-4">
                        <h1 className="font-museo text-lg sm:text-xl font-semibold flex items-center">
                            {name}
                            <button
                                onClick={() => navigate(`/sets/${id}/edit`)}
                                className="ml-8 text-lg text-gray-300 hover:text-yellow-400"
                                title="Edit"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={toggleFavorite}
                                className={`ml-8 ${
                                    isFavorite
                                        ? 'text-yellow-400'
                                        : 'text-gray-300 hover:text-yellow-300'
                                }`}
                                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <FaStar />
                            </button>
                            {accuracy !== null && (
                                <div
                                    className="relative ml-8 w-6 h-6 rounded-full shrink-0"
                                    style={{
                                        background: `conic-gradient(${
                                            accuracy >= 70
                                                ? '#10b981'
                                                : accuracy >= 30
                                                ? '#f97316'
                                                : '#ef4444'
                                        } ${accuracy}%, #e5e7eb 0%)`,
                                    }}
                                    title={`Correct answers: ${accuracy}%`}
                                >
                                    <div className="absolute inset-1 rounded-full bg-black" />
                                </div>
                            )}
                        </h1>
                        <button
                            onClick={() => navigate(`/study/${id}`)}
                            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-1.5 rounded-xl"
                        >
                            <TbCardsFilled />
                            Flashcards
                        </button>
                    </div>
                </div>
                {loading ? (
                    <p>Loading…</p>
                ) : (
                    <>
                        <p className="font-barlow text-sm mb-4">
                            Terms in this set ({cards.length})
                        </p>

                        <div className="flex flex-col gap-4">
                            {cards.map((fc) => (
                                <div
                                    key={fc.id}
                                    className="border rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm font-barlow"
                                >
                                    <span className="flex-1 mr-4">{fc.term}</span>
                                    <span className="flex-1 mr-10">{fc.definition}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
