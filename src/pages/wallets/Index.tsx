import { useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/ui/Button";
import { fetchWallets } from "../../utils/services/wallet";
import { filterInitialValues, filterValidationSchema } from "../../utils/forms/wallet";
import type { IWallet } from "../../utils/interfaces/wallet";
import { FilterWalletForm, AddWalletModal, EditWalletModal, DeleteWalletModal, ExportWalletButton } from "./components/Index";
import { DataTable } from "../../components/ui/DataTable";

export function ListWalletsPage() {
    const [pageIndex, setPageIndex] = useState(1);
    const [filterFormValues, setFilterFormValues] = useState(filterInitialValues);
    const [addNewWalletModalOpen, setAddNewWalletModalOpen] = useState(false);
    const [editWalletModalOpen, setEditWalletModalOpen] = useState(false);
    const [walletToEdit, setWalletToEdit] = useState<IWallet>({} as IWallet);
    const [deleteWalletModalOpen, setDeleteWalletModalOpen] = useState(false);
    const [walletToDeleteId, setWalletToDeleteId] = useState<string>("");

    const filterForm = useFormik({
        initialValues: filterInitialValues,
        validationSchema: filterValidationSchema,
        onSubmit: (values) => {
            setFilterFormValues(values);
            setPageIndex(1);
        },
    });

    const walletQuery = useQuery({
        queryKey: ["wallets", filterFormValues, pageIndex],
        queryFn: () => fetchWallets(filterFormValues, pageIndex),
        placeholderData: (prev) => prev,
    });

    function handleAddNewWallet() {
        setAddNewWalletModalOpen(true);
    }

    function closeAddNewWalletModal() {
        setAddNewWalletModalOpen(false);
    }

    function handleEditWallet(wallet: IWallet) {
        setWalletToEdit(wallet);
        setEditWalletModalOpen(true);
    }

    function closeEditWalletModal() {
        setEditWalletModalOpen(false);
    }

    function handleDeleteWallet(walletId: string) {
        setWalletToDeleteId(walletId);
        setDeleteWalletModalOpen(true);
    }

    function closeDeleteWalletModal() {
        setDeleteWalletModalOpen(false);
        setWalletToDeleteId("");
    }

    function changePageIndex(newPageIndex: number) {
        setPageIndex(newPageIndex);
    }

    const DataTableColumns = [
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
                        onClick={() => handleEditWallet(item)}
                        title="Editar carteira"
                    >
                        <PencilIcon size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteWallet(item.id)}
                        title="Excluir carteira"
                    >
                        <TrashIcon size={18} />
                    </Button>
                </div>
            )
        },
    ]

    useEffect(() => {
        if (walletQuery.isError) {
            toast.error("Erro ao carregar as carteiras. Por favor, tente novamente mais tarde.");
        }
    }, [walletQuery.isError]);

    useEffect(() => {
        if (walletQuery.data?.pagination.last && pageIndex > walletQuery.data.pagination.last) {
            setPageIndex(walletQuery.data.pagination.last);
        }
        if (!filterFormValues.nome && !filterFormValues.sobrenome && !filterFormValues.email) return;
        if (walletQuery.isSuccess && walletQuery.data?.data.length === 0) {
            toast.error("Nenhuma carteira encontrada com os filtros aplicados. (O valor deve ser exato.)");
        }
    }, [walletQuery.isSuccess, walletQuery.data]);

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-[0.36px]">BTC Carteiras</h1>
                    <Button
                        onClick={handleAddNewWallet}
                    >
                        <span className="hidden md:inline">Adicionar Carteira</span>
                        <PlusIcon className="block md:hidden" />
                    </Button>
                </div>
                <FilterWalletForm formik={filterForm} />
                <div className="bg-white rounded-sm shadow-lg">
                    <div className="flex justify-between items-center mb-6 px-5 pt-5">
                        <h3 className="text-lg font-bold">Carteiras</h3>
                        <ExportWalletButton />
                    </div>
                    <DataTable
                        columns={DataTableColumns}
                        data={walletQuery.data?.data || []}
                        isLoading={walletQuery.isLoading}
                        pagination={walletQuery.data?.pagination}
                        changePageIndex={changePageIndex}
                    />
                </div>
            </div>
            <AddWalletModal
                addNewWalletModalOpen={addNewWalletModalOpen}
                closeAddNewWalletModal={closeAddNewWalletModal}
            />
            <EditWalletModal
                walletToEdit={walletToEdit}
                editWalletModalOpen={editWalletModalOpen}
                closeEditWalletModal={closeEditWalletModal}
            />
            <DeleteWalletModal
                walletToDeleteId={walletToDeleteId}
                deleteWalletModalOpen={deleteWalletModalOpen}
                closeDeleteWalletModal={closeDeleteWalletModal}
            />
        </>
    )
}