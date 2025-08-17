import { SearchIcon } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export function Filter() {
    return (
        <div className="bg-white grid md:grid-cols-[repeat(3,1fr)_140px] gap-2.5 p-5 rounded-sm shadow-lg">
            <Input
                label="Nome"
                name="nome"
                id="nome"
            />
            <Input
                label="Sobrenome"
                name="sobrenome"
                id="sobrenome"
            />
            <Input
                label="E-mail"
                name="email"
                id="email"
            />
            <Button
                variant="primary-outline"
                icon={<SearchIcon size={18} />}
            >
                Buscar
            </Button>
        </div>
    )
}