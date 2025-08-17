export interface ITableListProps {
    isLoading?: boolean;
    totalItems?: number | null;
    totalPages?: number | null;
    prevIndex?: number | null;
    pageIndex: number;
    nextIndex?: number | null;
    changePageIndex: (newPageIndex: number) => void;
}
