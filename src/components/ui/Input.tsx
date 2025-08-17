import type { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}


export function Input({ label, error, ...props }: IInputProps) {
    return (
        <div className="relative">
            <input
                id={props.id}
                className={`block w-full rounded-sm px-2.5 pb-1.5 pt-4 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer ${error ? "border-red-500" : "border-neutral-300 focus:border-blue-600"}`}
                placeholder=""
                autoComplete={props.name}
                {...props}
            />
            <label
                htmlFor={props.id}
                className={`absolute cursor-text scale-75 duration-300 transform -translate-y-3 top-3 z-10 origin-[0] start-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${error ? "text-red-500" : "text-blue-600 peer-focus:text-blue-600 peer-placeholder-shown:text-neutral-500"}`}
            >
                {label}
            </label>
            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}
        </div>
    )
}