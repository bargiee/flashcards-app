export const lastReviewedAt = (
    deckId: number,
    progress: { flashcard: { deckId: number }; lastReviewed: string }[]
): number =>
    progress
        .filter((p) => p.flashcard.deckId === deckId)
        .reduce((max, p) => Math.max(max, new Date(p.lastReviewed).getTime()), 0);

export const daysAgo = (value: string | null): string => {
    if (!value) return 'Never';
    const diffMs = Date.now() - new Date(value).getTime();
    const diff = Math.floor(Math.max(diffMs, 0) / 86400000);
    if (isNaN(diff)) return 'Never';
    if (diff === 0) return 'Today';
    if (diff === 1) return '1 day ago';
    return `${diff} days ago`;
};
