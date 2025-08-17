import { LogOutIcon } from "lucide-react";
import { Button } from "../../ui/Button";

export function Header() {
    return (
        <header className="bg-white px-5">
            <div className="container mx-auto flex justify-between items-center py-6 gap-4">
                <img src="./images/logo.svg" className="hidden md:flex w-[211px] h-[30px]" alt="Oliveira Trust" />
                <img src="./images/small-logo.svg" className="flex md:hidden h-8 w-8" alt="Oliveira Trust" />
                <div className="flex justify-between items-center gap-3">
                    <div className="rounded-full border border-gray-300">
                        <img src="./images/avatar.svg" className="w-[30px] h-[30px]" alt="Avatar do usuário" />
                    </div>
                    <p className="text-sm font-semibold truncate max-w-32">
                        Victor Martins 
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <LogOutIcon size={18} />
                    </Button>
                </div>
            </div>
        </header>
    )
}