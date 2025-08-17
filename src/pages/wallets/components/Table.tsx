import { Loader2Icon, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow } from "../../../components/ui/Table";
import type { IUser } from "../../../utils/interfaces/user";
import type { ITableListProps } from "../../../utils/interfaces/table";

interface IWalletsTableProps extends ITableListProps {
    users: IUser[];
}

export function WalletsTable({
    users,
    isLoading,
    totalItems,
    totalPages,
    prevIndex,
    pageIndex,
    nextIndex,
    changePageIndex,
}: IWalletsTableProps) {

    function handleEditUser(user: IUser) {
        console.log("Edit user:", user);
    }

    function handleDeleteUser(userId: number) {
        console.log("Delete user:", userId);
    }

    return (
        <div className="overflow-x-auto">
            <div className="px-5">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Sobrenome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Bitcoin</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length > 0 ? (
                            <>
                                {users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.nome}</TableCell>
                                        <TableCell>{user.sobrenome}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.valor_carteira}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEditUser(user)}
                                                >
                                                    <PencilIcon size={18} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <TrashIcon size={18} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <>
                                {isLoading ? (
                                    <TableRow className="pointer-events-none">
                                        <TableCell colSpan={5}>
                                            <div className="flex items-center min-h-">
                                                <Loader2Icon size={40} className="animate-spin mx-auto text-primary" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow className="pointer-events-none">
                                        <TableCell colSpan={5} className="text-center h-24 text-lg">
                                            Nenhum resultado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                totalItems={totalItems}
                totalPages={totalPages}
                prevIndex={prevIndex}
                pageIndex={pageIndex}
                nextIndex={nextIndex}
                changePageIndex={changePageIndex}
            />
        </div>
    )
}