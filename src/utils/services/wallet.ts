import type { filterInitialValues } from "../forms/wallet";
import type { PaginatedResponse } from "../interfaces/api";
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
        const response = await api<PaginatedResponse<IWallet>>(
            `/users?${params}`,
            {
                method: "GET",
            }
        );
        return response;
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
