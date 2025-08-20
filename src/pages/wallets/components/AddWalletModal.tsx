import { useFormik } from "formik";
import { Modal } from "../../../components/ui/Modal";
import { initialValues, validationSchema } from "../../../utils/forms/wallet";
import { Button } from "../../../components/ui/Button";
import { WalletForm } from "./WalletForm";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import type { IWallet } from "../../../utils/interfaces/wallet";
import { createWallet } from "../../../utils/services/wallet";
import { generateHash } from "../../../utils/functions/generateHash";
import { queryClient } from "../../../App";
import toast from "react-hot-toast";
import { useWallets } from "../../../hooks/useWallets.hook";

export function AddWalletModal() {
    const {
        addNewWalletModalOpen,
        closeAddNewWalletModal,
        convertedValueInNewCurrency,
        changeConvertedValueInNewCurrency,
        fetchCurrencyMutation,
        isConvertingValue
    } = useWallets();

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
                valor_carteira: convertedValueInNewCurrency ? parseFloat(convertedValueInNewCurrency) : 0,
                endereco_carteira: generateHash(17),
            };
            return await createWallet(formattedWalletData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wallets"],
                exact: false
            });
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
            if (isConvertingValue) {
                toast.error("Aguarde a conversão do valor antes de adicionar a carteira.");
                return;
            }
            mutation.mutate(values);
        },
    });

    useEffect(() => {
        if (addNewWalletModalOpen) {
            changeConvertedValueInNewCurrency("0");
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
                    disabled={fetchCurrencyMutation.isPending || isConvertingValue}
                >
                    Adicionar
                </Button>
            </div>
        </Modal>
    )
}