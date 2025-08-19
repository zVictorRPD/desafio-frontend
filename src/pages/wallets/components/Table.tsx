import { Loader2Icon, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow } from "../../../components/ui/Table";
import type { IWallet } from "../../../utils/interfaces/wallet";
import type { ITableListProps } from "../../../utils/interfaces/table";
interface IWalletsTableProps extends ITableListProps {
    wallets: IWallet[];
    editWallet: (wallet: IWallet) => void;
    deleteWallet: (walletId: string) => void;
}

export function WalletsTable({
    wallets,
    isLoading,
    totalItems,
    totalPages,
    prevIndex,
    pageIndex,
    nextIndex,
    changePageIndex,
    editWallet,
    deleteWallet
}: IWalletsTableProps) {

    function handleEditWallet(wallet: IWallet) {
        editWallet(wallet);
    }

    function handleDeleteWallet(walletId: string) {
        deleteWallet(walletId);
    }

    return (
        <>
            <div className="overflow-x-auto min-h-[524px]">
                <div className="px-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-56">Nome</TableHead>
                                <TableHead className="w-56">Sobrenome</TableHead>
                                <TableHead className="w-md">Email</TableHead>
                                <TableHead className="w-64">Bitcoin</TableHead>
                                <TableHead className="w-32"/>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {wallets.length > 0 ? (
                                <>
                                    {wallets.map(wallet => (
                                        <TableRow key={wallet.id}>
                                            <TableCell>{wallet.nome}</TableCell>
                                            <TableCell>{wallet.sobrenome}</TableCell>
                                            <TableCell>{wallet.email}</TableCell>
                                            <TableCell>{wallet.valor_carteira}</TableCell>
                                            <TableCell>
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEditWallet(wallet)}
                                                        title="Editar carteira"
                                                    >
                                                        <PencilIcon size={18} />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDeleteWallet(wallet.id)}
                                                        title="Excluir carteira"
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
                                                <div className="flex items-center">
                                                    <Loader2Icon size={40} className="animate-spin mx-auto text-primary" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow className="pointer-events-none">
                                            <TableCell colSpan={5} className="text-center text-lg">
                                                Nenhum resultado.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <TablePagination
                totalItems={totalItems}
                totalPages={totalPages}
                prevIndex={prevIndex}
                pageIndex={pageIndex}
                nextIndex={nextIndex}
                changePageIndex={changePageIndex}
            />
        </>
    )
}