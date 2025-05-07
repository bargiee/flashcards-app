import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { FaEdit } from 'react-icons/fa';
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
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <NavBar />
            <div className="max-w-4xl mx-auto px-4 py-10 mt-20 mb-20">
                <Link to="/library" className="text-md text-gray-400 hover:text-black block">
                    &lt; back to library
                </Link>

                <div className="sticky top-0 z-10 bg-white pt-4 pb-6 -mx-4 px-4 mb-10">
                    <div className="bg-black text-white rounded-xl flex items-center justify-between px-4 py-4">
                        <h1 className="font-museo text-lg sm:text-xl font-semibold flex-1">
                            {name}
                            <button
                                onClick={() => navigate(`/sets/${id}/edit`)}
                                className="ml-3 text-lg hover:text-yellow-400"
                            >
                                <FaEdit />
                            </button>
                        </h1>
                        <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-1.5 rounded-xl">
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
