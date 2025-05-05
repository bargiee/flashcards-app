import { FaTrash } from 'react-icons/fa';

interface Props {
    index: number;
    term: string;
    definition: string;
    onChange: (field: 'term' | 'definition', value: string) => void;
    onDelete: () => void;
}

const FlashcardInput = ({ index, term, definition, onChange, onDelete }: Props) => {
    return (
        <div className="border p-6 rounded-xl mb-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <span className="font-bold">{index + 1}</span>
                <button onClick={onDelete} className="text-gray-600 hover:text-red-400">
                    <FaTrash />
                </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Enter a term"
                        value={term}
                        onChange={(e) => onChange('term', e.target.value)}
                        className="w-full border-b-2 border-black focus:outline-none pb-2"
                    />
                    <label className="text-xs text-gray-600 uppercase font-semibold">Term</label>
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Enter a definition"
                        value={definition}
                        onChange={(e) => onChange('definition', e.target.value)}
                        className="w-full border-b-2 border-black focus:outline-none pb-2"
                    />
                    <label className="text-xs text-gray-600 uppercase font-semibold">
                        Definition
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FlashcardInput;
