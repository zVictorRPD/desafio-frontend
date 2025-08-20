import { WalletsContext } from "../pages/wallets/WalletContext";
import { useContext } from "react";

function useWallets() {
    const context = useContext(WalletsContext);
    if (!context) {
        throw new Error("useWallets must be used within a WalletsProvider");
    }
    return context;
}

export { useWallets };