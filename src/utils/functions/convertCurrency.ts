export function convertBTCtoBRL(amountBTC: number, bid: string): number {
    const bidNumber = parseFloat(bid);
    return amountBTC * bidNumber;
}

export function convertBRLtoBTC(amountBRL: number, ask: string): number {
    const askNumber = parseFloat(ask);
    return amountBRL / askNumber;
}