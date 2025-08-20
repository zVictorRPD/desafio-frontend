export const CURRENCY_CODES = {
    "BTC-BRL": "BTCBRL",
} as const;

export type TCURRENCY_CODES_REQUEST = keyof typeof CURRENCY_CODES;
type TCURRENCY_CODES_RESPONSE = (typeof CURRENCY_CODES)[TCURRENCY_CODES_REQUEST];

export interface ICurrencyData {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
}

export type ICurrency<
    T extends TCURRENCY_CODES_RESPONSE = TCURRENCY_CODES_RESPONSE
> = {
    [K in T]: ICurrencyData;
};
