
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppContainer } from "./components/layout/app/AppContainer"
import { ListWalletsPage } from "./pages/wallets/Index"
import { Toaster } from "react-hot-toast"

export const queryClient = new QueryClient()

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AppContainer>
                    <ListWalletsPage />
                </AppContainer>
            </QueryClientProvider>
            <Toaster
                position="top-right"
            />
        </>
    )
}

export default App
