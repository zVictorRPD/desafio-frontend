import type { IBTCBRLCurrency } from "../interfaces/currency";

export async function fetchCurrency(currencyCode: string) {
    try {
        const response = await fetch(
            `https://economia.awesomeapi.com.br/json/last/${currencyCode}`,
            {
                method: "GET",
            }
        );
        return response.json() as Promise<IBTCBRLCurrency>;
    } catch (error) {
        throw error;
    }
}