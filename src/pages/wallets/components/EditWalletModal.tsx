import { useFormik } from "formik";
import { Modal } from "../../../components/ui/Modal";
import { initialValues, validationSchema } from "../../../utils/forms/wallet";
import { Button } from "../../../components/ui/Button";
import { WalletForm } from "./WalletForm";
import type { IWallet } from "../../../utils/interfaces/wallet";
import { useEffect, useState } from "react";
import { fetchCurrency } from "../../../utils/services/currency";
import { convertBTCtoBRL } from "../../../utils/functions/convertCurrency";
import { useMutation } from "@tanstack/react-query";
import { generateHash } from "../../../utils/functions/generateHash";
import { editWallet } from "../../../utils/services/wallet";
import { queryClient } from "../../../App";

interface IEditWalletModalProps {
    walletToEdit: IWallet;
    editWalletModalOpen: boolean;
    closeEditWalletModal: () => void;
}

export function EditWalletModal({
    walletToEdit,
    editWalletModalOpen,
    closeEditWalletModal
}: IEditWalletModalProps) {
    const [valueInBTC, setValueInBTC] = useState("0");
    const [isFetchingCurrency, setIsFetchingCurrency] = useState(false);

    const mutation = useMutation({
        mutationKey: ["editWallet"],
        mutationFn: async (walletData: typeof initialValues) => {
            const formattedWalletData: IWallet = {
                id: walletToEdit.id,
                nome: walletData.nome,
                sobrenome: walletData.sobrenome,
                email: walletData.email,
                endereco: "",
                data_nascimento: "",
                data_abertura: new Date().toISOString(),
                valor_carteira: valueInBTC ? parseFloat(valueInBTC) : 0,
                endereco_carteira: generateHash(17),
            };
            return await editWallet(formattedWalletData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wallets"] })
            closeEditWalletModal();
        },
        onError: (error) => {
            console.error("Error creating wallet:", error);
        }
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    async function handleLoadFormData() {
        if (!walletToEdit) return;
        try {
            const lastBTCtoBRLCurrency = await fetchCurrency("BTC-BRL");
            const walletTotalValue = convertBTCtoBRL(walletToEdit.valor_carteira, lastBTCtoBRLCurrency.BTCBRL.bid);
            formik.setValues({
                nome: walletToEdit.nome || "",
                sobrenome: walletToEdit.sobrenome || "",
                email: walletToEdit.email || "",
                valor: walletTotalValue * 100,
            });
            setValueInBTC(String(walletToEdit.valor_carteira));
        } catch (error) {
            console.error("Error fetching currency data:", error);
        }
    }

    function changeValueInBTC(value: string) {
        setValueInBTC(value);
    }

    function changeIsFetchingCurrency(value: boolean) {
        setIsFetchingCurrency(value);
    }

    useEffect(() => {
        handleLoadFormData();
    }, [walletToEdit, editWalletModalOpen]);

    return (
        <Modal
            title="Editar Carteira"
            isOpen={editWalletModalOpen}
            onRequestClose={closeEditWalletModal}
        >
            <WalletForm
                formId="edit-wallet-form"
                formik={formik}
                valueInBTC={valueInBTC}
                changeValueInBTC={changeValueInBTC}
                changeIsFetchingCurrency={changeIsFetchingCurrency}
            />
            <div className="flex justify-end mt-4">
                <Button
                    onClick={closeEditWalletModal}
                    variant="primary-ghost"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    form="edit-wallet-form"
                    isLoading={mutation.isPending}
                    disabled={isFetchingCurrency}
                >
                    Editar
                </Button>
            </div>
        </Modal>
    )
}