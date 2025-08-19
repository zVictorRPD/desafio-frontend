export interface IPaginatedApiResponse<T> extends IPagination {
    data: T[];
}

export interface IPaginatedFormattedResponse<T> {
    data: T[];
    pagination: IPagination & { index: number };
}

export interface IPagination {
    first: number | null;
    items: number | null;
    last: number | null;
    next: number | null;
    pages: number | null;
    prev: number | null;
}