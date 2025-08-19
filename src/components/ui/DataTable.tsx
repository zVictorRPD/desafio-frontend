import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";
import { Button } from "./Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";
import type { IPagination } from "../../utils/interfaces/api";

interface IDataTableColumn<T> {
    key: keyof T | string;
    title?: string;
    className?: string;
    render?: (item: T) => React.ReactNode;
}

export interface IDataTableProps<T> {
    data: T[];
    isLoading?: boolean;
    pagination?: IPagination & { index: number };
    changePageIndex?: (newPageIndex: number) => void;
    columns: IDataTableColumn<T>[];
}

export function DataTable<T>({
    data,
    isLoading = false,
    pagination,
    changePageIndex,
    columns
}: IDataTableProps<T>) {
    return (
        <>
            <div className="overflow-x-auto min-h-[524px]">
                <div className="px-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableHead key={String(column.key)} className={column.className}>
                                        {column.title}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <TableRow key={index}>
                                        {columns.map((column, colIndex) => (
                                            <TableCell key={colIndex} className={column.className}>
                                                {column.render
                                                    ? column.render(item)
                                                    : (item as any)[column.key] ?? "N/A"}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="pointer-events-none">
                                    <TableCell colSpan={columns.length} className="text-center text-lg">
                                        {isLoading ? (
                                            <Loader2Icon size={40} className="animate-spin mx-auto text-primary" />
                                        ) : (
                                            "Nenhum resultado."
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {pagination && (
                <TablePagination
                    pagination={pagination}
                    changePageIndex={changePageIndex}
                />
            )}
        </>
    );
}

interface IDataTablePaginationProps {
    pagination: IPagination & { index: number };
    changePageIndex?: (newPageIndex: number) => void;
}

function TablePagination({ pagination, changePageIndex }: IDataTablePaginationProps) {
    const { items, pages, prev, index, next } = pagination;
    function handleChangePage(newPage: number) {
        changePageIndex && changePageIndex(newPage);
    }
    const getPageNumbers = () => {
        if (!pages || pages <= 0) return [1];
        if (pages <= 3) {
            return Array.from({ length: pages }, (_, i) => i + 1);
        }
        if (index === 1) {
            return [1, 2, 3];
        }
        if (index >= pages) {
            return [pages - 2, pages - 1, pages];
        }
        return [index - 1, index, index + 1];
    };


    const pageNumbers = getPageNumbers();

    return (
        <div className="mt-5 border-t border-neutral-100">
            <div className="flex items-center justify-between p-5">
                <span className="text-neutral-500 text-sm">{items ? items : 0} registro(s)</span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleChangePage(prev ? prev : 1)}
                        disabled={index === 1}
                    >
                        <ChevronLeftIcon size={18} />
                    </Button>
                    {pageNumbers.map((pageNumber, i) => {
                        return (
                            <Button
                                key={new Date().getTime() + i}
                                variant={pageNumber === index ? "primary" : "ghost-outline"}
                                size="icon"
                                onClick={() => handleChangePage(pageNumber)}
                            >
                                <span className="px-1 text-sm">{pageNumber}</span>
                            </Button>
                        )
                    })}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleChangePage(next ? next : index)}
                        disabled={index === pages || !next}
                    >
                        <ChevronRightIcon size={18} />
                    </Button>
                </div>
            </div>
        </div>
    )
}