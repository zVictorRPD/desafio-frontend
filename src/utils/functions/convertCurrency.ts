export function convertBaseToQuote(amount: number, bid: string): number {
    const bidNumber = parseFloat(bid);
    const formattedAmount = amount;
    return formattedAmount * bidNumber * 100;
}

export function convertQuoteToBase(amount: number, ask: string): number {
    const askNumber = parseFloat(ask);
    const formattedAmount = amount / 100;
    return formattedAmount / askNumber;
}
