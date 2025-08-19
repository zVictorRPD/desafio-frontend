import type { filterInitialValues } from "../forms/wallet";
import { generateCsvFileUrl } from "../functions/generateCsvFile";
import type { IPaginatedFormattedResponse, IPaginatedApiResponse } from "../interfaces/api";
import type { IWallet } from "../interfaces/wallet";
import { api, buildRequestParams } from "./api";

export async function fetchWallets(
    filter: typeof filterInitialValues,
    pageIndex: number
) {
    let notEmptyFilters = { ...filter } as any;
    Object.keys(notEmptyFilters).forEach(
        (key) => notEmptyFilters[key] === "" && delete notEmptyFilters[key]
    );

    const params = buildRequestParams({
        _page: pageIndex,
        _per_page: 10,
        ...notEmptyFilters,
    });
    try {
        const response = await api<IPaginatedApiResponse<IWallet>>(
            `/users?${params}`,
            {
                method: "GET",
            }
        );
        const formattedResponse = {
            data: response.data,
            pagination: {
                items: response.items,
                pages: response.pages,
                prev: response.prev,
                index: pageIndex,
                next: response.next,
                last: response.last
            },
        } as IPaginatedFormattedResponse<IWallet>;
        return formattedResponse;
    } catch (error) {
        throw error;
    }
}

export async function createWallet(wallet: Omit<IWallet, "id">) {
    try {
        const response = await api<IWallet>(`/users`, {
            method: "POST",
            body: JSON.stringify(wallet),
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function editWallet(wallet: IWallet) {
    try {
        const response = await api<IWallet>(`/users/${wallet.id}`, {
            method: "PUT",
            body: JSON.stringify(wallet),
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteWallet(walletId: string) {
    try {
        const response = await api<IWallet>(`/users/${walletId}`, {
            method: "DELETE",
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function exportWallet() {
    try {
        const response = await api<IWallet[]>(`/users`, {
            method: "GET",
        });
        const headers = [
            "id",
            "nome",
            "sobrenome",
            "email",
            "endereco",
            "data_nascimento",
            "data_abertura",
            "valor_carteira",
            "endereco_carteira",
        ];
        const csvFileUrl = generateCsvFileUrl(headers, response);
        return csvFileUrl;
    } catch (error) {
        throw error;
    }
}
