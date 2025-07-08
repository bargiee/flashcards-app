interface Props {
    title: string;
    termsCount: number;
    lastReviewed: string;
    createdAt: string;
    onClick?: () => void;
}

const formatDaysAgo = (date: string | null): string => {
    if (!date) return 'Never';

    const diffDays = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (isNaN(diffDays)) return 'Never';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
};

const LibraryCard = ({ title, termsCount, lastReviewed, onClick, createdAt }: Props) => {
    return (
        <div
            onClick={onClick}
            className="rounded-xl border overflow-hidden shadow-sm mb-6 hover:shadow-lg hover:-translate-y-0.5 transition cursor-pointer"
        >
            <div className="bg-black text-white px-6 py-3 flex justify-between items-center">
                <span className="font-semibold font-museo">{title}</span>
            </div>
            <div className="mt-4">
                <div className="bg-white px-6 py-4 grid grid-cols-2 grid-rows-2 text-sm gap-y-1">
                    <span className="text-gray-400 font-extralight col-start-1 row-start-1">
                        Created: {new Date(createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-gray-400 font-extralight col-start-1 row-start-2">
                        Last reviewed: {formatDaysAgo(lastReviewed)}
                    </span>
                    <span className="text-gray-800 font-semibold col-start-2 row-start-2 justify-self-end">
                        {termsCount} terms
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LibraryCard;
