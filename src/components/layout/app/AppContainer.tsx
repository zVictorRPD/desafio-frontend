import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface IAppContainer {
    children: ReactNode
}

export function AppContainer({ children }: IAppContainer) {
    return (
        <>
            <Header />
            <main className="container mx-auto my-5 px-5 min-h-[calc(100vh-180px)] md:my-10 md:min-h-[calc(100vh-240px)]">
                {children}
            </main>
            <Footer />
        </>
    )
}