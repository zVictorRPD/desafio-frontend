import { useMutation } from "@tanstack/react-query";
import { Button } from "../../../components/ui/Button";
import { DeleteModal } from "../../../components/ui/Modal";
import { deleteWallet } from "../../../utils/services/wallet";
import { queryClient } from "../../../App";

interface IDeleteWalletModalProps {
    walletToDeleteId: string;
    deleteWalletModalOpen: boolean;
    closeDeleteWalletModal: () => void;
}

export function DeleteWalletModal({
    walletToDeleteId,
    deleteWalletModalOpen,
    closeDeleteWalletModal
}: IDeleteWalletModalProps) {

    const mutation = useMutation({
        mutationKey: ["deleteWallet"],
        mutationFn: async () => {
            return await deleteWallet(walletToDeleteId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wallets"] })
            closeDeleteWalletModal();
        },
        onError: (error) => {
            console.error("Error creating wallet:", error);
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