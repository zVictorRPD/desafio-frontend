import { Loader2Icon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
    variant?: "primary" | "danger" | "primary-outline" | "danger-outline" | "primary-ghost" | "ghost" | "ghost-outline";
    icon?: ReactNode;
    size?: "default" | "icon";
}

const variantClasses = {
    "primary": "bg-primary text-white border border-primary hover:opacity-85",
    "danger": "bg-danger text-white border border-danger hover:opacity-85",
    "primary-outline": "border border-primary text-primary hover:bg-primary hover:text-white",
    "danger-outline": "border border-danger text-danger hover:bg-danger hover:text-white",
    "primary-ghost": "bg-transparent border border-transparent text-primary",
    "ghost": "bg-transparent border border-transparent hover:bg-neutral-100 hover:text-neutral-900",
    "ghost-outline": "bg-transparent border border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
}

const sizesClasses = {
    "default": "px-2 md:px-8 py-2",
    "icon": "p-1.5"
}

const defaultStyles = "inline-flex items-center justify-center gap-2 items-center cursor-pointer rounded-sm text-base font-semibold transition-all disabled:pointer-events-none disabled:opacity-50"

export function Button({ children, isLoading = false, variant = "primary", size = "default", icon, ...props }: IButtonProps) {
    return (
        <button
            {...props}
            className={`${props.className ? props.className : ""} ${variantClasses[variant]} ${defaultStyles} ${sizesClasses[size]}`}
            disabled={isLoading || props.disabled}
        >
            {!isLoading ? icon : <Loader2Icon className="animate-spin" />}
            {children}
        </button>
    )
}