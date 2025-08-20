import { createContext, useState, type ReactNode } from "react";
import type { IWallet } from "../../utils/interfaces/wallet";
import { filterInitialValues } from "../../utils/forms/wallet";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { fetchCurrency } from "../../utils/services/currency";
import { CURRENCY_CODES, type ICurrencyData, type TCURRENCY_CODES_REQUEST } from "../../utils/interfaces/currency";

interface IWalletsContext {
    // Filtro de carteiras
    filterFormValues: typeof filterInitialValues;
    changeFilterFormValues: (values: typeof filterInitialValues) => void;

    // Controle da paginação
    pageIndex: number;
    changePageIndex: (pageIndex: number) => void;

    // Controle da conversão de moedas
    convertedValueInNewCurrency: string;
    changeConvertedValueInNewCurrency: (value: string) => void;
    fetchCurrencyMutation: UseMutationResult<ICurrencyData, Error, TCURRENCY_CODES_REQUEST>;
    isConvertingValue: boolean;
    changeIsConvertingValue: (isConverting: boolean) => void;

    // Modal de add carteira
    addNewWalletModalOpen: boolean;
    openAddNewWalletModal: () => void;
    closeAddNewWalletModal: () => void;

    // Modal de editar carteira
    walletToEdit: IWallet;
    editWalletModalOpen: boolean;
    openEditWalletModal: (wallet: IWallet) => void;
    closeEditWalletModal: () => void;

    // Modal de excluir carteira
    walletToDelete: IWallet;
    deleteWalletModalOpen: boolean;
    openDeleteWalletModal: (wallet: IWallet) => void;
    closeDeleteWalletModal: () => void;
}

interface IWalletsProviderProps {
    children: ReactNode;
}

export const WalletsContext = createContext<IWalletsContext>({} as IWalletsContext);

export function WalletsProvider({ children }: IWalletsProviderProps) {
    const [filterFormValues, setFilterFormValues] = useState(filterInitialValues);
    const [pageIndex, setPageIndex] = useState(1);
    const [convertedValueInNewCurrency, setConvertedValueInNewCurrency] = useState("0");
    const [isConvertingValue, setIsConvertingValue] = useState(false);
    const [addNewWalletModalOpen, setAddNewWalletModalOpen] = useState(false);
    const [editWalletModalOpen, setEditWalletModalOpen] = useState(false);
    const [walletToEdit, setWalletToEdit] = useState<IWallet>({} as IWallet);
    const [deleteWalletModalOpen, setDeleteWalletModalOpen] = useState(false);
    const [walletToDelete, setWalletToDelete] = useState<IWallet>({} as IWallet);

    function changeFilterFormValues(values: typeof filterInitialValues) {
        setFilterFormValues(values);
    }

    function changePageIndex(newPageIndex: number) {
        setPageIndex(newPageIndex);
    }

    function changeConvertedValueInNewCurrency(value: string) {
        setConvertedValueInNewCurrency(value);
    }

    function changeIsConvertingValue(isConverting: boolean) {
        setIsConvertingValue(isConverting);
    }

    function openAddNewWalletModal() {
        setAddNewWalletModalOpen(true);
    }

    function closeAddNewWalletModal() {
        setAddNewWalletModalOpen(false);
    }

    function openEditWalletModal(wallet: IWallet) {
        setWalletToEdit(wallet);
        setEditWalletModalOpen(true);
    }

    function closeEditWalletModal() {
        setWalletToEdit({} as IWallet);
        setEditWalletModalOpen(false);
    }

    function openDeleteWalletModal(wallet: IWallet) {
        setWalletToDelete(wallet);
        setDeleteWalletModalOpen(true);
    }

    function closeDeleteWalletModal() {
        setWalletToDelete({} as IWallet);
        setDeleteWalletModalOpen(false);
    }

    const fetchCurrencyMutation = useMutation({
        mutationKey: ["currency"],
        mutationFn: async (currencyCode: TCURRENCY_CODES_REQUEST) => {
            const response = await fetchCurrency(currencyCode);
            return response[CURRENCY_CODES[currencyCode]];
        }
    });

    const walletsContextData = {
        // Filtro de carteiras
        filterFormValues,
        changeFilterFormValues,

        // Controle da paginação
        pageIndex,
        changePageIndex,

        // Controle da conversão de moedas
        convertedValueInNewCurrency,
        changeConvertedValueInNewCurrency,
        fetchCurrencyMutation,
        isConvertingValue,
        changeIsConvertingValue,

        // Modal de add carteira
        addNewWalletModalOpen,
        openAddNewWalletModal,
        closeAddNewWalletModal,

        // Modal de editar carteira
        walletToEdit,
        editWalletModalOpen,
        openEditWalletModal,
        closeEditWalletModal,

        // Modal de excluir carteira
        walletToDelete,
        deleteWalletModalOpen,
        openDeleteWalletModal,
        closeDeleteWalletModal,

    }

    return (
        <WalletsContext.Provider
            value={walletsContextData}
        >
            {children}
        </WalletsContext.Provider>
    );
}