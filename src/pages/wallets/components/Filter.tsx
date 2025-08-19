import { SearchIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import type { FormikProps } from "formik";
import { filterInitialValues } from "../../../utils/forms/wallet";
interface IWalletsPageFilterProps {
    formik: FormikProps<typeof filterInitialValues>;
}

export function WalletsPageFilter({ formik }: IWalletsPageFilterProps) {
    return (
        <form id="wallets-filter-form" onSubmit={formik.handleSubmit}>
            <div className="bg-white grid md:grid-cols-[repeat(3,1fr)_140px] gap-2.5 p-5 rounded-sm shadow-lg items-center">
                <Input
                    id="nome"
                    name="nome"
                    label="Nome"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                />
                <Input
                    id="sobrenome"
                    name="sobrenome"
                    label="Sobrenome"
                    value={formik.values.sobrenome}
                    onChange={formik.handleChange}
                />
                <Input
                    id="email"
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