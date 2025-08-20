import { useFormik } from "formik";
import { Modal } from "../../../components/ui/Modal";
import { initialValues, validationSchema } from "../../../utils/forms/wallet";
import { Button } from "../../../components/ui/Button";
import { WalletForm } from "./WalletForm";
import type { IWallet } from "../../../utils/interfaces/wallet";
import { useEffect } from "react";
import { convertBaseToQuote } from "../../../utils/functions/convertCurrency";
import { useMutation } from "@tanstack/react-query";
import { generateHash } from "../../../utils/functions/generateHash";
import { editWallet } from "../../../utils/services/wallet";
import { queryClient } from "../../../App";
import toast from "react-hot-toast";
import { useWallets } from "../../../hooks/useWallets.hook";


export function EditWalletModal() {
    const {
        editWalletModalOpen,
        closeEditWalletModal,
        walletToEdit,
        fetchCurrencyMutation,
        changeConvertedValueInNewCurrency,
        convertedValueInNewCurrency,
        isConvertingValue
    } = useWallets();

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
                valor_carteira: convertedValueInNewCurrency ? parseFloat(convertedValueInNewCurrency) : 0,
                endereco_carteira: generateHash(17),
            };
            return await editWallet(formattedWalletData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wallets"],
                exact: false
            });
            toast.success("Carteira editada com sucesso.");
        },
        onError: () => {
            toast.error("Erro ao editar carteira, tente novamente mais tarde.");
        },
        onSettled: () => {
            closeEditWalletModal();
        }
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (isConvertingValue) {
                toast.error("Aguarde a conversão do valor antes de editar a carteira.");
                return;
            }
            mutation.mutate(values);
        },
    });

    async function handleLoadFormData() {
        if (!walletToEdit) return;

        fetchCurrencyMutation.mutateAsync("BTC-BRL", {
            onSuccess: (currencyData) => {
                const convertedValue = convertBaseToQuote(walletToEdit.valor_carteira, currencyData.bid);
                formik.setValues({
                    nome: walletToEdit.nome || "",
                    sobrenome: walletToEdit.sobrenome || "",
                    email: walletToEdit.email || "",
                    valor: convertedValue,
                });
                changeConvertedValueInNewCurrency(String(walletToEdit.valor_carteira));
            },
            onError: () => {
                toast.error("Erro ao carregar os dados da carteira. Tente novamente mais tarde.");
                changeConvertedValueInNewCurrency("0");
                formik.setFieldValue('valor', 0);
                closeEditWalletModal();
            },
        });
    }

    useEffect(() => {
        if (!editWalletModalOpen || !walletToEdit) return;
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
                    disabled={fetchCurrencyMutation.isPending || isConvertingValue}
                >
                    Editar
                </Button>
            </div>
        </Modal>
    )
}