import { useState } from 'react';
import { PiArrowBendUpLeft } from 'react-icons/pi';

interface Props {
    term: string;
    definition: string;
    slideDirection?: 'left' | 'right' | null;
}

export default function Flashcard({ term, definition, slideDirection }: Props) {
    const [flipped, setFlipped] = useState(false);

    const slideOutClass =
        slideDirection === 'left'
            ? '-translate-x-[20%] opacity-0'
            : slideDirection === 'right'
            ? 'translate-x-[20%] opacity-0'
            : '';

    return (
        <div
            className={`relative w-full h-full cursor-pointer select-none
                [perspective:2000px]
                transition-all duration-200 ease-in-out
                ${slideOutClass}`}
            onClick={() => setFlipped((p) => !p)}
        >
            <div
                className={`relative w-full h-full duration-200
                    [transform-style:preserve-3d]
                    ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
                <div
                    className="absolute inset-0 flex items-center justify-center
                        rounded-xl bg-white text-center p-8
                        text-2xl font-barlow text-black
                        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.10)]
                        [backface-visibility:hidden]"
                >
                    {term}
                    <PiArrowBendUpLeft className="absolute top-4 right-4 text-yellow-400 text-xl" />
                    <span className="absolute top-4 left-4 text-gray-500 text-sm font-thin bg-gray-50 rounded-xl px-3 py-1">
                        term
                    </span>
                </div>
                <div
                    className="absolute inset-0 flex items-center justify-center
                        rounded-xl bg-white text-center p-8
                        text-2xl font-barlow text-black
                        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.10)]
                        [transform:rotateY(180deg)]
                        [backface-visibility:hidden]"
                >
                    {definition}
                    <PiArrowBendUpLeft className="absolute top-4 right-4 text-yellow-400 text-xl" />
                    <span className="absolute top-4 left-4 text-gray-500 text-sm font-thin bg-gray-50 rounded-xl px-3 py-1">
                        definition
                    </span>
                </div>
            </div>
        </div>
    );
}
