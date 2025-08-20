import { useEffect } from "react";
import { PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/ui/Button";
import { fetchWallets } from "../../utils/services/wallet";
import { FilterWalletForm, ExportWalletButton } from "./components/Index";
import { DataTable } from "../../components/ui/DataTable";
import { useWallets } from "../../hooks/useWallets.hook";
import { useDataTableWalletColumns } from "./components/DataTableWalletColumns";

export function ListWallets() {
    const { openAddNewWalletModal, filterFormValues, pageIndex, changePageIndex } = useWallets();
    const dataTableColumns = useDataTableWalletColumns();

    const walletQuery = useQuery({
        queryKey: ["wallets", filterFormValues, pageIndex],
        queryFn: () => fetchWallets(filterFormValues, pageIndex),
        placeholderData: (prev) => prev,
    });

    useEffect(() => {
        if (walletQuery.isError) {
            toast.error("Erro ao carregar as carteiras. Por favor, tente novamente mais tarde.");
        }
    }, [walletQuery.isError]);

    useEffect(() => {
        
        if (walletQuery.data?.pagination.last && pageIndex > walletQuery.data.pagination.last) {
            changePageIndex(walletQuery.data.pagination.last);
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
                        onClick={openAddNewWalletModal}
                    >
                        <span className="hidden md:inline">Adicionar Carteira</span>
                        <PlusIcon className="block md:hidden" />
                    </Button>
                </div>
                <FilterWalletForm />
                <div className="bg-white rounded-sm shadow-lg">
                    <div className="flex justify-between items-center mb-6 px-5 pt-5">
                        <h3 className="text-lg font-bold">Carteiras</h3>
                        <ExportWalletButton />
                    </div>
                    <DataTable
                        columns={dataTableColumns}
                        data={walletQuery.data?.data || []}
                        isLoading={walletQuery.isLoading}
                        pagination={walletQuery.data?.pagination}
                        changePageIndex={changePageIndex}
                    />
                </div>
            </div>
        </>
    )
}