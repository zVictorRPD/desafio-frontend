import type { PaginatedResponse } from "../interfaces/api";
import type { IUser } from "../interfaces/user";
import { api, buildRequestParams } from "./api";

export async function fetchUsers(filter: any, pageIndex: number) {
    const params = buildRequestParams({
        _page: pageIndex,
        _per_page: 10,
        ...filter,
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
