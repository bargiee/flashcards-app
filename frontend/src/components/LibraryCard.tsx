interface Props {
    title: string;
    termsCount: number;
    lastReviewed: string;
    onDelete?: () => void;
    onClick?: () => void;
}

const LibraryCard = ({ title, termsCount, lastReviewed, onDelete, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className="rounded-xl border overflow-hidden shadow-sm mb-6 hover:shadow-lg hover:-translate-y-0.5 transition cursor-pointer"
        >
            <div className="bg-black text-white px-6 py-3 flex justify-between items-center">
                <span className="font-semibold">{title}</span>
            </div>
            <div className="mt-4">
                <div className="bg-white px-6 py-4 flex justify-between text-sm">
                    <span className="text-gray-600 font-normal">Last revised {lastReviewed}</span>
                    <span className="text-gray-800 font-semibold">{termsCount} terms</span>
                </div>
            </div>
        </div>
    );
};

export default LibraryCard;
