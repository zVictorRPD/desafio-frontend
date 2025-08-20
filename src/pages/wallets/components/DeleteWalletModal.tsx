import { useMutation } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button";
import { DeleteModal } from "../../../components/ui/Modal";
import { deleteWallet } from "../../../utils/services/wallet";
import { queryClient } from "../../../App";
import toast from "react-hot-toast";
import { useWallets } from "../../../hooks/useWallets.hook";


export function DeleteWalletModal() {
    const { deleteWalletModalOpen, closeDeleteWalletModal, walletToDelete } = useWallets();

    const mutation = useMutation({
        mutationKey: ["deleteWallet"],
        mutationFn: async () => {
            return await deleteWallet(walletToDelete.id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wallets"],
                exact: false
            });
            toast.success("Carteira excluída com sucesso.");
        },
        onError: () => {
            toast.error("Erro ao excluir carteira, tente novamente mais tarde.");
        },
        onSettled: () => {
            closeDeleteWalletModal();
        }
    });

    function handleDeleteWallet() {
        mutation.mutate();
    }

    return (
        <DeleteModal
            title="Excluir Carteira"
            isOpen={deleteWalletModalOpen}
            onRequestClose={closeDeleteWalletModal}
            deleteEntity="Carteira"
        >
            <div className="flex flex-col justify-center max-w-96 w-full gap-6 mx-auto">
                <Button
                    variant="danger"
                    onClick={handleDeleteWallet}
                    className="w-full"
                    isLoading={mutation.isPending}
                >
                    Excluir
                </Button>
                <Button
                    variant="primary-ghost"
                    onClick={closeDeleteWalletModal}
                    className="w-full"
                >
                    Cancelar
                </Button>
            </div>
        </DeleteModal>
    )
}