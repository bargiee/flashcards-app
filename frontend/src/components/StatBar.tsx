export function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
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
