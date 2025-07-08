interface Props {
    title: string;
    percent: number;
    onClick?: () => void;
}

export default function RecentFlashcard({ title, percent, onClick }: Props) {
    const ringColor = percent >= 70 ? '#10b981' : percent >= 30 ? '#f97316' : '#ef4444';

    return (
        <div
            onClick={onClick}
            className="flex items-center justify-between gap-4
                 rounded-xl border shadow-sm px-6 py-4 hover:shadow-md
                 hover:-translate-y-0.5 transition cursor-pointer"
        >
            <div>
                <h2 className="font-museo font-semibold">{title}</h2>
                <p className="font-barlow text-sm text-gray-500">Correct answers: {percent}%</p>
            </div>
            <div
                className="relative w-16 h-16 rounded-full shrink-0"
                style={{
                    background: `conic-gradient(${ringColor} ${percent}%, #e5e7eb 0)`,
                }}
            >
                <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center text-xs font-bold">
                    {percent}%
                </div>
            </div>
        </div>
    );
}
