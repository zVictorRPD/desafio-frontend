export function generateCsvFileUrl(headers: string[], data: any[]) {
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of data) {
        const values = headers.map((header) => {
            return `"${row[header]}"`;
        });
        csvRows.push(values.join(","));
    }
    const csvString = csvRows.join("\n");
    const csvFileUrl = "data:text/csv;charset=utf-8," + encodeURIComponent(csvString);
    return csvFileUrl;
}
