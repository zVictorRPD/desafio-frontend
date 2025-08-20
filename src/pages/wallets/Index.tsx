import { AddWalletModal } from "./components/AddWalletModal";
import { DeleteWalletModal } from "./components/DeleteWalletModal";
import { EditWalletModal } from "./components/EditWalletModal";
import { ListWallets } from "./ListWallets";
import { WalletsProvider } from "./WalletContext";

export function WalletsPage() {
    return (
        <WalletsProvider>
            <ListWallets />
            <AddWalletModal />
            <EditWalletModal />
            <DeleteWalletModal />
        </WalletsProvider>
    )
}