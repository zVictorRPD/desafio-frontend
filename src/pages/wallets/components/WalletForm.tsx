import { Input } from "../../../components/ui/Input";
import type { FormikProps } from "formik";
import { initialValues } from "../../../utils/forms/wallet";
import { moneyMask, removeMask } from "../../../utils/functions/masks";
import { useState } from "react";
import { useWallets } from "../../../hooks/useWallets.hook";
import { convertQuoteToBase } from "../../../utils/functions/convertCurrency";
import toast from "react-hot-toast";

interface IWalletFormProps {
    formId: string;
    formik: FormikProps<typeof initialValues>;
}

export function WalletForm({ formId, formik }: IWalletFormProps) {
    const {
        fetchCurrencyMutation,
        convertedValueInNewCurrency,
        changeConvertedValueInNewCurrency,
        changeIsConvertingValue
    } = useWallets();
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

    async function handleValueChange(amount: number) {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        changeIsConvertingValue(true);
        const timeout = setTimeout(async () => {
            fetchCurrencyMutation.mutateAsync("BTC-BRL", {
                onSuccess: (currencyData) => {
                    if (!currencyData) {
                        changeConvertedValueInNewCurrency("0");
                        return;
                    }
                    const convertedValue = convertQuoteToBase(amount, currencyData.ask);
                    changeConvertedValueInNewCurrency(String(convertedValue));
                },
                onError: () => {
                    toast.error("Erro ao converter valor. Tente novamente mais tarde.");
                    changeConvertedValueInNewCurrency("0");
                    formik.setFieldValue('valor', 0);
                },
                onSettled: () => {
                    changeIsConvertingValue(false);
                }
            });
        }, 800);
        setDebounceTimeout(timeout);
    }

    return (
        <form id={formId} onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2.5">
                <Input
                    id="nome"
                    name="nome"
                    label="Nome"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    error={formik.errors.nome && formik.touched.nome ? formik.errors.nome : ''}
                />
                <Input
                    id="sobrenome"
                    name="sobrenome"
                    label="Sobrenome"
                    value={formik.values.sobrenome}
                    onChange={formik.handleChange}
                    error={formik.errors.sobrenome && formik.touched.sobrenome ? formik.errors.sobrenome : ''}
                />
                <Input
                    id="email"
                    name="email"
                    label="E-mail"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && formik.touched.email ? formik.errors.email : ''}
                />
                <div className="grid md:grid-cols-2 items-center gap-4">
                    <Input
                        id="valor"
                        name="valor"
                        label="Valor de compra"
                        value={moneyMask(formik.values.valor)}
                        onChange={(e) => {
                            const value = Number(removeMask(e.target.value))
                            formik.setFieldValue('valor', value);
                            handleValueChange(value);
                        }}
                        error={formik.errors.valor && formik.touched.valor ? formik.errors.valor : ''}
                    />
                    <p className="font-bold text-2xl">
                        BTC {parseFloat(convertedValueInNewCurrency).toFixed(12)}
                    </p>
                </div>
            </div>
        </form>
    )
}