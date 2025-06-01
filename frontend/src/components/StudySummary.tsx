import { TbRefresh } from 'react-icons/tb';
import { BsArrowLeft } from 'react-icons/bs';

interface Props {
    known: number;
    stillLearning: number;
    onRestart: () => void;
    onBack: () => void;
}

export default function StudySummary({ known, stillLearning, onRestart, onBack }: Props) {
    const total = known + stillLearning;
    const percent = total ? Math.round((known / total) * 100) : 0;

    const donutStyle = {
        background: `conic-gradient(#10b981 ${percent}%, #f97316 0)`,
    };

    return (
        <div className="max-w-xl mx-auto mt-20 text-center px-4">
            <h1 className="font-museo text-xl font-semibold mb-12 py-3 rounded-xl bg-black text-white ">
                Set finished!
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-12">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-40 h-40 rounded-full" style={donutStyle}>
                        <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center font-museo text-xl">
                            {percent}%
                        </div>
                    </div>

                    <div className="text-left mt-4 w-52 max-w-full">
                        <StatBar label="Know" value={known} color="bg-[#10b981]" />
                        <StatBar
                            label="Still learning"
                            value={stillLearning}
                            color="bg-[#f97316]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-6 w-60">
                    <button
                        onClick={onRestart}
                        className="flex items-center justify-center gap-2
              bg-yellow-400 hover:bg-yellow-500 text-black text-md font-semibold rounded-xl py-3
              transition"
                    >
                        <TbRefresh /> Restart Flashcards
                    </button>
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center gap-2
        border border-black bg-white text-black text-md font-semibold rounded-xl py-3
        hover:bg-black hover:text-white transition"
                    >
                        <BsArrowLeft /> Back to library
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="flex items-center gap-3 mb-1">
            <span className={`w-3 h-3 rounded-full ${color}`} />
            <div className="flex-1 flex justify-between items-center">
                <span className="font-barlow text-sm">{label}</span>
                <span className="font-semibold">{value}</span>
            </div>
        </div>
    );
}
