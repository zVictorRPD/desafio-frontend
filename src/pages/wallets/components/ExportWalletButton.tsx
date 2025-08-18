import { useMutation } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button";
import { exportWallet } from "../../../utils/services/wallet";
import toast from "react-hot-toast";

export function ExportWalletButton() {
    const mutation = useMutation({
        mutationKey: ["createWallet"],
        mutationFn: async () => {
            return await exportWallet();
        },
        onSuccess: (csvFileUrl) => {
            const link = document.createElement("a");
            link.setAttribute("href", csvFileUrl);
            link.setAttribute("download", "carteiras.csv");
            document.body.appendChild(link);
            link.click();
            toast.success("Carteiras exportadas com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao exportar carteiras, tente novamente mais tarde.");
        }
    });

    function handleExportWallet() {
        mutation.mutate();
    }

    return (
        <Button
            variant="primary-outline"
            isLoading={mutation.isPending}
            onClick={handleExportWallet}
        >
            Exportar CSV
        </Button>
    )
}