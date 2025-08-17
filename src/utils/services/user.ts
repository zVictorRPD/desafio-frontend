import type { filterInitialValues } from "../forms/user";
import type { PaginatedResponse } from "../interfaces/api";
import type { IUser } from "../interfaces/user";
import { api, buildRequestParams } from "./api";

export async function fetchUsers(filter: typeof filterInitialValues, pageIndex: number) {
    let notEmptyFilters = { ...filter } as any;
    Object.keys(notEmptyFilters).forEach(key => notEmptyFilters[key] === "" && delete notEmptyFilters[key]);

    const params = buildRequestParams({
        _page: pageIndex,
        _per_page: 10,
        ...notEmptyFilters,
    });
    try {
        const response = await api<PaginatedResponse<IUser>>(
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
