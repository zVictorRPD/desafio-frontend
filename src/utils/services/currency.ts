import type { ICurrency, TCURRENCY_CODES_REQUEST } from "../interfaces/currency";

export async function fetchCurrency(currencyCode: TCURRENCY_CODES_REQUEST) {
    try {
        const response = await fetch(
            `https://economia.awesomeapi.com.br/json/last/${currencyCode}`,
            {
                method: "GET",
            }
        );
        return response.json() as Promise<ICurrency<"BTCBRL">>;
    } catch (error) {
        throw error;
    }
}
