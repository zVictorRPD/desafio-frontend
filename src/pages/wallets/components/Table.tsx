import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import type { IUser } from "../../../utils/interfaces/user";

interface IWalletsTableProps {
    users: IUser[];
}

export function WalletsTable({ users }: IWalletsTableProps) {

    function handleEditUser(user: IUser) {
        console.log("Edit user:", user);
    }

    function handleDeleteUser(userId: number) {
        console.log("Delete user:", userId);
    }

    return (
        <div className="overflow-x-auto">
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
                </TableBody>
            </Table>
        </div>
    )
}