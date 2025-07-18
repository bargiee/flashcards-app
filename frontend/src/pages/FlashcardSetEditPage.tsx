import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar';
import { downloadCsvFile } from '../utils/exportCsv';
import { RiPencilFill } from 'react-icons/ri';
import { IoReturnUpBack } from 'react-icons/io5';
import { FiTrash, FiPlus } from 'react-icons/fi';
import { FiRotateCw } from 'react-icons/fi';
import { LuDownload } from 'react-icons/lu';

interface Flashcard {
    id?: number;
    term: string;
    definition: string;
}

export default function FlashcardSetDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [editing, setEditing] = useState(false);
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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

    const handleCardChange = (idx: number, field: 'term' | 'definition', val: string) =>
        setCards((prev) => prev.map((c, i) => (i === idx ? { ...c, [field]: val } : c)));

    const addCard = () => setCards([...cards, { term: '', definition: '' }]);
    const removeCard = (idx: number) => setCards(cards.filter((_, i) => i !== idx));

    const deleteDeck = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this set?');
        if (!confirmDelete) return;

        try {
            await api.delete(`/decks/${id}`);
            toast.success('Deck deleted');
            navigate('/library');
        } catch {
            toast.error('Error deleting deck');
        }
    };

    const exportCsv = () => {
        if (!cards.length) {
            toast.error('Nothing to export');
            return;
        }
        downloadCsvFile(cards, `${name || 'flashcards'}.csv`);
    };

    const saveChanges = async () => {
        if (!id) return;
        setSaving(true);
        try {
            const clean = cards.filter((c) => c.term.trim() && c.definition.trim());

            await api.put(`/decks/${id}`, { name, flashcards: clean });
            toast.success('Changes saved!');
        } catch {
            toast.error('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const handleResetProgress = async () => {
        if (!id || !window.confirm('Reset all progress for this set?')) return;
        try {
            await api.delete(`/progress/deck/${id}`);
            toast.success('Progress reset!');
        } catch {
            toast.error('Could not reset progress');
        }
    };

    return (
        <>
            <NavBar />

            <div className="max-w-4xl mx-auto px-4 py-10 mt-20 mb-20">
                <button
                    onClick={() => navigate(-1)}
                    className="flex text-md text-gray-400 hover:text-black items-center gap-2"
                >
                    <IoReturnUpBack /> back
                </button>

                <div className="sticky top-0 z-10 bg-white pt-4 pb-6 -mx-4 px-4 mb-10">
                    <div className="bg-black text-white rounded-xl flex items-center justify-between pl-6 pr-4 py-4">
                        {editing ? (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => setEditing(false)}
                                autoFocus
                                className="bg-transparent outline-none border-b w-1/2"
                            />
                        ) : (
                            <h1 className="font-museo text-lg sm:text-xl font-normal flex-1">
                                {name || 'Untitled'}
                                <button
                                    onClick={() => setEditing(true)}
                                    className="ml-3 text-lg text-gray-300 hover:text-yellow-500"
                                    title="Edit title"
                                >
                                    <RiPencilFill />
                                </button>
                            </h1>
                        )}

                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleResetProgress}
                                className="ml-3 text-lg text-gray-300 hover:text-red-400"
                                title="Reset progress"
                            >
                                <FiRotateCw />
                            </button>
                            <button
                                onClick={deleteDeck}
                                className="text-gray-300 hover:text-red-400 text-lg"
                                title="Delete"
                            >
                                <FiTrash />
                            </button>
                            <button
                                onClick={exportCsv}
                                className="flex items-center gap-2 border border-yellow-400 text-yellow-400 font-medium px-5 py-1.5 rounded-xl hover:bg-yellow-500 hover:text-black transition"
                            >
                                <LuDownload />
                                Export CSV
                            </button>
                            <button
                                onClick={saveChanges}
                                disabled={saving}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-1.5 rounded-xl flex items-center gap-2"
                            >
                                {saving ? 'Saving…' : 'Save'}
                            </button>
                        </div>
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
                            {cards.map((c, idx) => (
                                <div
                                    key={c.id ?? idx}
                                    className="border rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm"
                                >
                                    <input
                                        value={c.term}
                                        onChange={(e) =>
                                            handleCardChange(idx, 'term', e.target.value)
                                        }
                                        placeholder="Term"
                                        className="flex-1 mr-4 border-b border-black outline-none font-barlow"
                                    />
                                    <input
                                        value={c.definition}
                                        onChange={(e) =>
                                            handleCardChange(idx, 'definition', e.target.value)
                                        }
                                        placeholder="Definition"
                                        className="flex-1 mr-2 border-b border-black outline-none font-barlow"
                                    />
                                    <button
                                        onClick={() => removeCard(idx)}
                                        className="text-gray-600 hover:text-yellow-400"
                                    >
                                        <FiTrash />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-10">
                            <button
                                onClick={addCard}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full text-lg"
                            >
                                <FiPlus />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
