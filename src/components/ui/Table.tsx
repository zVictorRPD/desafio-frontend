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
