
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppContainer } from "./components/layout/app/AppContainer"
import { ListWalletsPage } from "./pages/wallets/Index"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppContainer>
                <ListWalletsPage />
            </AppContainer>
        </QueryClientProvider>
    )
}

export default App
