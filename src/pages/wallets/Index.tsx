import { PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Filter } from "./components/Filter";
import { WalletsTable } from "./components/Table";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../utils/services/user";
import { useState } from "react";

export function ListWalletsPage() {
    const [pageIndex, setPageIndex] = useState(1);
    const userQuery = useQuery({
        queryKey: ["users", pageIndex],
        queryFn: () => fetchUsers({}, pageIndex),
    });

    if(userQuery.error) {
        console.log(userQuery.error);
    }

    function handleAddNewWallet() {
        console.log("Adicionar nova carteira");
    }

    function changePageIndex(newPageIndex: number) {
        setPageIndex(newPageIndex);
    }

    return (
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
            <Filter />
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
                    users={userQuery.data?.data || []}
                    isLoading={userQuery.isLoading}
                    pageIndex={pageIndex}
                    changePageIndex={changePageIndex}
                    nextIndex={userQuery.data?.next}
                    prevIndex={userQuery.data?.prev}
                    totalItems={userQuery.data?.items}
                    totalPages={userQuery.data?.last || null}
                />
            </div>
        </div>
    )
}