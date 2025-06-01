import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import NavBar from '../components/NavBar';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { RiCloseLargeLine } from 'react-icons/ri';
import toast from 'react-hot-toast';
import Flashcard from '../components/Flashcard';
import StudySummary from '../components/StudySummary';

interface Flashcard {
    id: number;
    term: string;
    definition: string;
}

const sendProgress = async (flashcardId: number, known: boolean) => {
    try {
        await api.post('/progress', {
            flashcardId,
            known,
        });
    } catch (err) {
        console.error('progress save failed', err);
    }
};

export default function FlashcardStudyPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [deckName, setDeckName] = useState('');
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [idx, setIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    const [showCard, setShowCard] = useState(true);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/decks/${id}`);
                setDeckName(data.name);
                setCards(data.flashcards ?? []);
            } catch {
                toast.error('Could not load deck');
                navigate('/library');
            } finally {
                setLoading(false);
            }
        })();
    }, [id, navigate]);

    const current = cards[idx];

    const handleAnswer = async (known: boolean) => {
        setSlideDirection(known ? 'right' : 'left');

        setTimeout(async () => {
            setShowCard(false);
            await sendProgress(current.id, known);

            known ? setCorrect((c) => c + 1) : setWrong((w) => w + 1);

            if (idx + 1 < cards.length) {
                setIdx((prev) => prev + 1);
                setSlideDirection(null);

                setTimeout(() => setShowCard(true), 50);
            } else {
                setFinished(true);
            }
        }, 300);
    };

    if (loading) return <p className="mt-20 text-center">Loading…</p>;
    if (!cards.length) return <p className="mt-20 text-center">No cards.</p>;

    return (
        <>
            <NavBar />
            {finished ? (
                <StudySummary
                    known={correct}
                    stillLearning={wrong}
                    onRestart={() => {
                        setIdx(0);
                        setCorrect(0);
                        setWrong(0);
                        setFinished(false);
                        setSlideDirection(null);
                        setShowCard(true);
                    }}
                    onBack={() => navigate('/library')}
                />
            ) : (
                <>
                    <div className="max-w-[34rem] mx-auto mt-20 mb-10">
                        <div className="flex justify-between bg-black text-white px-6 py-3 rounded-xl font-museo font-semibold text-lg tracking-wide mx-20 md:mx-auto">
                            {deckName}
                            <button onClick={() => navigate(-1)} className="hover:text-yellow-400">
                                <RiCloseLargeLine />
                            </button>
                        </div>
                    </div>
                    <p className="text-center mt-2 font-barlow text-lg">
                        {idx + 1}/{cards.length}
                    </p>
                    <div className="relative flex justify-center items-center mt-6 gap-2 sm:gap-6 md:gap-16 lg:gap-24">
                        <button
                            onClick={() => handleAnswer(false)}
                            className="flex items-center justify-center w-10 h-16 sm:w-10 sm:h-10 md:w-12 md:h-12
                                   rounded-full bg-[#f97316] text-white shadow-md
                                   hover:scale-110 active:scale-95 transition-transform"
                        >
                            <FaTimes />
                        </button>
                        <div className="w-[24rem] h-[24rem] md:w-[34rem] md:h-[34rem]">
                            {showCard && (
                                <Flashcard
                                    key={current.id}
                                    term={current.term}
                                    definition={current.definition}
                                    slideDirection={slideDirection}
                                />
                            )}
                        </div>
                        <button
                            onClick={() => handleAnswer(true)}
                            className="flex items-center justify-center w-10 h-16 sm:w-10 sm:h-10 md:w-12 md:h-12
                                   rounded-full bg-[#10b981] text-white shadow-md
                                   hover:scale-110 active:scale-95 transition-transform"
                        >
                            <FaCheck />
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
