import { PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { WalletsPageFilter } from "./components/Filter";
import { WalletsTable } from "./components/Table";
import { useQuery } from "@tanstack/react-query";
import { fetchWallets } from "../../utils/services/wallet";
import { useState } from "react";
import { useFormik } from "formik";
import { filterInitialValues, filterValidationSchema } from "../../utils/forms/wallet";
import { AddWalletModal } from "./components/AddWalletModal";
import { EditWalletModal } from "./components/EditWalletModal";
import type { IWallet } from "../../utils/interfaces/wallet";

export function ListWalletsPage() {
    const [pageIndex, setPageIndex] = useState(1);
    const [filterFormValues, setFilterFormValues] = useState(filterInitialValues);
    const [addNewWalletModalOpen, setAddNewWalletModalOpen] = useState(false);
    const [editWalletModalOpen, setEditWalletModalOpen] = useState(false);
    const [walletToEdit, setWalletToEdit] = useState<IWallet>({} as IWallet);

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

    if (walletQuery.error) {
        console.log(walletQuery.error);
    }


    function handleAddNewWallet() {
        setAddNewWalletModalOpen(true);
    }

    function closeAddNewWalletModal() {
        setAddNewWalletModalOpen(false);
    }

    function editWallet(wallet: IWallet) {
        setWalletToEdit(wallet);
        setEditWalletModalOpen(true);
    }

    function closeEditWalletModal() {
        setEditWalletModalOpen(false);
    }

    function changePageIndex(newPageIndex: number) {
        setPageIndex(newPageIndex);
    }

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
                <WalletsPageFilter formik={filterForm} />
                <div className="bg-white rounded-sm shadow-lg">
                    <div className="flex justify-between items-center mb-6 px-5 pt-5">
                        <h3 className="text-lg font-bold">Carteiras</h3>
                        <Button
                            variant="primary-outline"
                        >
                            Exportar CSV
                        </Button>
                    </div>
                    <WalletsTable
                        wallets={walletQuery.data?.data || []}
                        isLoading={walletQuery.isLoading}
                        pageIndex={pageIndex}
                        changePageIndex={changePageIndex}
                        nextIndex={walletQuery.data?.next}
                        prevIndex={walletQuery.data?.prev}
                        totalItems={walletQuery.data?.items}
                        totalPages={walletQuery.data?.last || null}
                        editWallet={editWallet}
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
        </>
    )
}