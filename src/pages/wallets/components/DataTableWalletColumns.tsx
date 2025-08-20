import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { useWallets } from "../../../hooks/useWallets.hook";
import type { IWallet } from "../../../utils/interfaces/wallet";
import type { IDataTableColumn } from "../../../components/ui/DataTable";

export function useDataTableWalletColumns(): IDataTableColumn<IWallet>[] {
    const { openEditWalletModal, openDeleteWalletModal } = useWallets();

    return [
        { key: "nome", title: "Nome", className: "w-56" },
        { key: "sobrenome", title: "Sobrenome", className: "w-56" },
        { key: "email", title: "E-mail", className: "w-md" },
        { key: "valor_carteira", title: "Ações", className: "w-64" },
        {
            key: "actions", title: "", className: "w-32",
            render: (item: IWallet) => (
                <div className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditWalletModal(item)}
                        title="Editar carteira"
                    >
                        <PencilIcon size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteWalletModal(item)}
                        title="Excluir carteira"
                    >
                        <TrashIcon size={18} />
                    </Button>
                </div>
            )
        },
    ];
}