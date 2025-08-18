import { useFormik } from "formik";
import { Modal } from "../../../components/ui/Modal";
import { initialValues, validationSchema } from "../../../utils/forms/wallet";
import { Button } from "../../../components/ui/Button";
import { WalletForm } from "./WalletForm";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { IWallet } from "../../../utils/interfaces/wallet";
import { createWallet } from "../../../utils/services/wallet";
import { generateHash } from "../../../utils/functions/generateHash";
import { queryClient } from "../../../App";
import toast from "react-hot-toast";

interface IAddWalletModalProps {
    addNewWalletModalOpen: boolean;
    closeAddNewWalletModal: () => void;
}

export function AddWalletModal({
    addNewWalletModalOpen,
    closeAddNewWalletModal
}: IAddWalletModalProps) {
    const [valueInBTC, setValueInBTC] = useState("0");
    const [isFetchingCurrency, setIsFetchingCurrency] = useState(false);

    const mutation = useMutation({
        mutationKey: ["createWallet"],
        mutationFn: async (walletData: typeof initialValues) => {
            const formattedWalletData: Omit<IWallet, "id"> = {
                nome: walletData.nome,
                sobrenome: walletData.sobrenome,
                email: walletData.email,
                endereco: "",
                data_nascimento: "",
                data_abertura: new Date().toISOString(),
                valor_carteira: valueInBTC ? parseFloat(valueInBTC) : 0,
                endereco_carteira: generateHash(17),
            };
            return await createWallet(formattedWalletData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wallets"] })
            toast.success("Carteira criada com sucesso.");
        },
        onError: () => {
            toast.error("Erro ao criar carteira, tente novamente mais tarde.");
        },
        onSettled: () => {
            closeAddNewWalletModal();
        }
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    function changeValueInBTC(value: string) {
        setValueInBTC(String(value));
    }

    function changeIsFetchingCurrency(value: boolean) {
        setIsFetchingCurrency(value);
    }

    useEffect(() => {
        if (addNewWalletModalOpen) {
            setValueInBTC("0");
            formik.resetForm();
        }
    }, [addNewWalletModalOpen]);

    return (
        <Modal
            title="Adicionar Carteira"
            isOpen={addNewWalletModalOpen}
            onRequestClose={closeAddNewWalletModal}
        >
            <WalletForm
                formId="add-wallet-form"
                formik={formik}
                valueInBTC={valueInBTC}
                changeValueInBTC={changeValueInBTC}
                changeIsFetchingCurrency={changeIsFetchingCurrency}
            />
            <div className="flex justify-end mt-4">
                <Button
                    onClick={closeAddNewWalletModal}
                    variant="primary-ghost"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    form="add-wallet-form"
                    isLoading={mutation.isPending}
                    disabled={isFetchingCurrency}
                >
                    Adicionar
                </Button>
            </div>
        </Modal>
    )
}