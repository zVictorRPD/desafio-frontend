import { SearchIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useFormik } from "formik";
import { filterInitialValues, filterValidationSchema } from "../../../utils/forms/wallet";
import { useWallets } from "../../../hooks/useWallets.hook";

export function FilterWalletForm() {
    const { changeFilterFormValues, changePageIndex } = useWallets();

    const formik = useFormik({
        initialValues: filterInitialValues,
        validationSchema: filterValidationSchema,
        onSubmit: (values) => {
            changeFilterFormValues(values);
            changePageIndex(1);
        },
    });

    return (
        <form id="wallets-filter-form" onSubmit={formik.handleSubmit}>
            <div className="bg-white grid md:grid-cols-[repeat(3,1fr)_140px] gap-2.5 p-5 rounded-sm shadow-lg items-center">
                <Input
                    id="filter-nome"
                    name="nome"
                    label="Nome"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                />
                <Input
                    id="filter-sobrenome"
                    name="sobrenome"
                    label="Sobrenome"
                    value={formik.values.sobrenome}
                    onChange={formik.handleChange}
                />
                <Input
                    id="filter-email"
                    name="email"
                    label="E-mail"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <Button
                    variant="primary-outline"
                    icon={<SearchIcon size={18} />}
                    type="submit"
                    className="py-2.5"
                >
                    Buscar
                </Button>
            </div>
        </form>
    )
}