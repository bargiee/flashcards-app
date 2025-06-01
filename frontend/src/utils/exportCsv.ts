export function downloadCsvFile(
    rows: { term: string; definition: string }[],
    filename = 'flashcards.csv'
) {
    const csv = rows
        .map(({ term, definition }) =>
            [`"${term.replace(/"/g, '""')}"`, `"${definition.replace(/"/g, '""')}"`].join(',')
        )
        .join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
