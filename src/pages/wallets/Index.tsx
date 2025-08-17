import { PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Filter } from "./components/Filter";
import { WalletsTable } from "./components/Table";

const mockData = [
    {
        id: 1,
        nome: "João",
        sobrenome: "Silva",
        email: "joao.silva@email.com",
        endereco: "Rua das Flores, 123",
        data_nascimento: "1990-01-15",
        data_abertura: "2022-03-10",
        valor_carteira: 0.0542,
        endereco_carteira: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    },
    {
        id: 2,
        nome: "Maria",
        sobrenome: "Oliveira",
        email: "maria.oliveira@email.com",
        endereco: "Av. Brasil, 456",
        data_nascimento: "1985-07-22",
        data_abertura: "2021-11-05",
        valor_carteira: 0.1205,
        endereco_carteira: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
    },
    {
        id: 3,
        nome: "Carlos",
        sobrenome: "Santos",
        email: "carlos.santos@email.com",
        endereco: "Rua do Sol, 789",
        data_nascimento: "1992-03-30",
        data_abertura: "2023-01-20",
        valor_carteira: 0.0058,
        endereco_carteira: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kygt080"
    },
    {
        id: 4,
        nome: "Ana",
        sobrenome: "Costa",
        email: "ana.costa@email.com",
        endereco: "Rua das Palmeiras, 321",
        data_nascimento: "1995-12-10",
        data_abertura: "2020-08-15",
        valor_carteira: 0.3001,
        endereco_carteira: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT"
    },
    {
        id: 5,
        nome: "Pedro",
        sobrenome: "Almeida",
        email: "pedro.almeida@email.com",
        endereco: "Av. Central, 654",
        data_nascimento: "1988-05-18",
        data_abertura: "2022-06-12",
        valor_carteira: 0.0456,
        endereco_carteira: "3Ai1JZ8pdJb2ksieUV8FsxSNVJCpoPi8W6"
    },
    {
        id: 6,
        nome: "Juliana",
        sobrenome: "Ferreira",
        email: "juliana.ferreira@email.com",
        endereco: "Rua Nova, 987",
        data_nascimento: "1993-09-25",
        data_abertura: "2021-02-28",
        valor_carteira: 0.0789,
        endereco_carteira: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"
    },
    {
        id: 7,
        nome: "Lucas",
        sobrenome: "Martins",
        email: "lucas.martins@email.com",
        endereco: "Rua da Paz, 159",
        data_nascimento: "1991-11-11",
        data_abertura: "2023-04-01",
        valor_carteira: 0.0023,
        endereco_carteira: "1QLbGuc3WGmX1A1t1Qb1t1Qb1t1Qb1t1Qb"
    },
    {
        id: 8,
        nome: "Fernanda",
        sobrenome: "Ribeiro",
        email: "fernanda.ribeiro@email.com",
        endereco: "Av. das Américas, 753",
        data_nascimento: "1987-04-07",
        data_abertura: "2020-12-20",
        valor_carteira: 0.1500,
        endereco_carteira: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
    },
    {
        id: 9,
        nome: "Rafael",
        sobrenome: "Barbosa",
        email: "rafael.barbosa@email.com",
        endereco: "Rua Verde, 852",
        data_nascimento: "1996-06-19",
        data_abertura: "2021-09-09",
        valor_carteira: 0.0102,
        endereco_carteira: "bc1qw4w5r3zarvary0c5xw7kygt080"
    },
    {
        id: 10,
        nome: "Patrícia",
        sobrenome: "Gomes",
        email: "patricia.gomes@email.com",
        endereco: "Rua Azul, 246",
        data_nascimento: "1994-02-02",
        data_abertura: "2022-10-30",
        valor_carteira: 0.2007,
        endereco_carteira: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT"
    }
]

export function ListWalletsPage() {

    function handleAddNewWallet() {
        console.log("Adicionar nova carteira");
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-[0.36px]">BTC Carteiras</h1>
                <Button
                    onClick={handleAddNewWallet}
                >
                    <span className="hidden md:inline">Adicionar Carteira</span>
                    <PlusIcon className="block md:hidden" />
                </Button>
            </div>
            <Filter />
            <div className="bg-white p-5 rounded-sm shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Carteiras</h3>
                    <Button
                        variant="primary-outline"
                    >
                        Exportar CSV
                    </Button>
                </div>
                <WalletsTable
                    users={mockData}
                />
            </div>
        </div>
    )
}