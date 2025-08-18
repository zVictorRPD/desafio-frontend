import { Input } from "../../../components/ui/Input";
import type { FormikProps } from "formik";
import { initialValues } from "../../../utils/forms/wallet";
import { moneyMask, removeMask } from "../../../utils/forms/masks";
import { useState } from "react";
import { fetchCurrency } from "../../../utils/services/currency";
import { convertBRLtoBTC } from "../../../utils/functions/convertCurrency";

interface IWalletFormProps {
    formId: string;
    formik: FormikProps<typeof initialValues>;
    valueInBTC: string;
    changeValueInBTC: (value: string) => void;
    changeIsFetchingCurrency: (value: boolean) => void;
}

export function WalletForm({ formId, formik, valueInBTC, changeValueInBTC, changeIsFetchingCurrency }: IWalletFormProps) {
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

    async function handleValueChange(value: number) {
        if (debounceTimeout) clearTimeout(debounceTimeout);
        const timeout = setTimeout(async () => {
            try {
                if (value === 0) {
                    changeValueInBTC("0");
                    return;
                }
                changeIsFetchingCurrency(true);
                const lastBTCtoBRLCurrency = await fetchCurrency("BTC-BRL");
                const totalValueInBTC = convertBRLtoBTC(value / 100, lastBTCtoBRLCurrency.BTCBRL.ask);
                changeValueInBTC(String(totalValueInBTC));
            } catch (error) {
                console.error("Error fetching currency data:", error);
            } finally {
                changeIsFetchingCurrency(false);
            }
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
                        BTC {parseFloat(valueInBTC).toFixed(12)}
                    </p>
                </div>
            </div>
        </form>
    )
}