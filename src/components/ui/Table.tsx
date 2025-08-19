import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ITableListProps } from "../../utils/interfaces/table";
import { Button } from "./Button";

// inteface da table
interface ITableProps extends React.HTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
}

// interface do header, body
interface ITableSectionProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children?: React.ReactNode;
}

// interface row
interface ITableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
}

// interface do th e td
interface ITableCellProps extends React.HTMLAttributes<HTMLTableCellElement>, React.TdHTMLAttributes<HTMLTableCellElement> {
    children?: React.ReactNode;
}

interface ITablePaginationProps extends ITableListProps { }

export function Table({ children, ...props }: ITableProps) {
    return (<table {...props} className={`w-full ${props.className ? props.className : ""}`}>{children}</table>)
}

export function TableHeader({ children, ...props }: ITableSectionProps) {
    return (
        <thead {...props} className={`h-8 border-b-2 border-neutral-300 ${props.className ? props.className : ""}`}>{children}</thead>
    )
}

export function TableBody({ children, ...props }: ITableSectionProps) {
    return (
        <tbody {...props} className={`border-b-2 border-neutral-300 ${props.className ? props.className : ""}`}>{children}</tbody>
    )
}

export function TableRow({ children, ...props }: ITableRowProps) {
    return (
        <tr {...props} className={`even:bg-neutral-100 border-x-2 border-x-transparent [&:not(:has(th))]:hover:border-l-blue-600 [&:not(:has(th))]:hover:bg-neutral-50 ${props.className ? props.className : ""}`}>
            {children}
        </tr>
    )
}

export function TableHead({ children, ...props }: ITableCellProps) {
    return (
        <th {...props} className={`text-start font-semibold p-2 ${props.className ? props.className : ""}`}>{children}</th>
    )
}

export function TableCell({ children, ...props }: ITableCellProps) {
    return (
        <td {...props} className={`p-2 ${props.className ? props.className : ""}`}>{children}</td>
    )
}

export function TablePagination({
    totalPages,
    totalItems,
    nextIndex,
    pageIndex,
    prevIndex,
    changePageIndex
}: ITablePaginationProps) {
    function handleChangePage(newPage: number) {
        changePageIndex(newPage);
    }
    const getPageNumbers = () => {
        if (!totalPages || totalPages <= 0) return [1];
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (pageIndex === 1) {
            return [1, 2, 3];
        } 
        if (pageIndex >= totalPages) {
            return [totalPages - 2, totalPages - 1, totalPages];
        }
        return [pageIndex - 1, pageIndex, pageIndex + 1];
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="mt-5 border-t border-neutral-100">
            <div className="flex items-center justify-between p-5">
                <span className="text-neutral-500 text-sm">{totalItems ? totalItems : 0} registro(s)</span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleChangePage(prevIndex ? prevIndex : 1)}
                        disabled={pageIndex === 1}
                    >
                        <ChevronLeftIcon size={18} />
                    </Button>
                    {pageNumbers.map((pageNumber, index) => {
                        return (
                            <Button
                                key={new Date().getTime() + index}
                                variant={pageNumber === pageIndex ? "primary" : "ghost-outline"}
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
                        onClick={() => handleChangePage(nextIndex ? nextIndex : pageIndex)}
                        disabled={pageIndex === totalPages || !nextIndex}
                    >
                        <ChevronRightIcon size={18} />
                    </Button>
                </div>
            </div>
        </div>
    )
}