import { useState } from 'react';
import FlashcardInput from '../components/FlashcardInput';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import NavBar from '../components/NavBar';

export default function CreateSetPage() {
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState([
        { term: '', definition: '' },
        { term: '', definition: '' },
        { term: '', definition: '' },
    ]);

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
        if (!isFormValid()) {
            alert('Please enter a title and at least one complete flashcard.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/api/decks', {
                userId: 1,
                name: title,
                description: '',
            });
            const deckId = res.data.id;

            const flashcardRequests = cards
                .filter((c) => c.term.trim() && c.definition.trim())
                .map((card) =>
                    axios.post('http://localhost:8080/api/flashcards', {
                        deckId,
                        term: card.term,
                        definition: card.definition,
                    })
                );

            await Promise.all(flashcardRequests);

            alert('Deck created');
        } catch (err) {
            console.error(err);
            alert('Error creating set');
        }
    };

    const isFormValid = () => {
        const hasTitle = title.trim().length > 0;
        const hasValidCard = cards.some(
            (c) => c.term.trim().length > 0 && c.definition.trim().length > 0
        );
        return hasTitle && hasValidCard;
    };

    return (
        <>
            <NavBar />
            <div className="max-w-4xl mx-auto px-4 mt-20 mb-20">
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
                        <FaPlus />
                    </button>
                </div>
            </div>
        </>
    );
}
