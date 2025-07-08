import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api';
import FlashcardInput from '../components/FlashcardInput';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

export default function CreateSetPage() {
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState([
        { term: '', definition: '' },
        { term: '', definition: '' },
        { term: '', definition: '' },
    ]);

    const navigate = useNavigate();

    const handleCardChange = (index: number, field: 'term' | 'definition', value: string) => {
        const updated = [...cards];
        updated[index][field] = value;
        setCards(updated);
    };

    const handleDeleteCard = (index: number) => {
        setCards((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAddCard = () => {
        setCards((prev) => [...prev, { term: '', definition: '' }]);
    };

    const handleSubmit = async () => {
        if (!isFormValid()) return toast.error('Enter title and at least 1 card');

        try {
            const { data: deck } = await api.post('/decks', {
                name: title,
                description: '',
            });

            const reqs = cards
                .filter((c) => c.term.trim() && c.definition.trim())
                .map((c) =>
                    api.post('/flashcards', {
                        deckId: deck.id,
                        term: c.term,
                        definition: c.definition,
                    })
                );

            await Promise.all(reqs);
            toast.success('Deck created!');
            navigate('/library');
        } catch (err) {
            toast.error('Error creating deck');
        }
    };

    const isFormValid = () => {
        const hasTitle = title.trim().length > 0;
        const hasValidCard = cards.some(
            (c) => c.term.trim().length > 0 && c.definition.trim().length > 0
        );
        return hasTitle && hasValidCard;
    };

    const handleCsvImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        try {
            const { data: deck } = await api.post('/decks', {
                name: 'Imported Set',
                description: '',
            });

            await api.post('/import', {
                csv: text,
                deckId: deck.id,
            });

            toast.success('Deck created and import queued!');
            navigate('/library');
        } catch (err) {
            toast.error('Import failed');
        }
    };

    return (
        <>
            <NavBar />
            <div className="max-w-5xl mx-auto px-4 mt-20 mb-20">
                <h1 className="text-2xl font-medium border-b-4 border-black inline-block mb-10 font-museo">
                    Create a new flashcard set
                </h1>
                <div className="sticky top-0 z-10 bg-white pt-4 pb-6 -mx-4 px-4">
                    <div className="relative w-full mb-8">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a title, like “Biology - Chapter 22: Evolution”"
                            className="w-full bg-black text-white px-5 py-4 pr-32 rounded-xl focus:outline-none"
                        />
                        <label
                            htmlFor="csv-upload"
                            className="absolute top-1/2 right-32 -translate-y-1/2 border border-yellow-400 text-yellow-400 font-medium px-6 py-1 rounded-xl cursor-pointer bg-black hover:bg-yellow-500 hover:text-black transition"
                        >
                            Import CSV
                        </label>
                        <input
                            id="csv-upload"
                            type="file"
                            accept=".csv"
                            onChange={handleCsvImport}
                            className="hidden"
                        />

                        <button
                            onClick={handleSubmit}
                            className="absolute top-1/2 right-3 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-1 rounded-xl"
                        >
                            Create
                        </button>
                    </div>
                </div>
                {cards.map((card, idx) => (
                    <FlashcardInput
                        key={idx}
                        index={idx}
                        term={card.term}
                        definition={card.definition}
                        onChange={(field, value) => handleCardChange(idx, field, value)}
                        onDelete={() => handleDeleteCard(idx)}
                    />
                ))}

                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleAddCard}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full text-lg"
                    >
                        <FiPlus />
                    </button>
                </div>
            </div>
        </>
    );
}
