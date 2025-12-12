import React from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({ label, value, onChange }: any) {
    const [show, setShow] = React.useState(false);

    return (
        <div className="relative w-full my-4">
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                className="
                    peer w-full px-4 py-3
                    text-base sm:text-lg
                    rounded-xl border
                    dark:bg-slate-800 dark:border-slate-600
                    border-gray-300
                    outline-none transition-all
                    focus:border-blue-500 dark:focus:border-blue-400
                    placeholder-transparent
                "
                placeholder={label}
            />

            <label
                className={`absolute left-4 top-3 
                    text-gray-500 dark:text-gray-400 transition-all
                    peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-600
                    ${value && "top-[-10px] text-xs text-blue-600"}
                `}
            >
                {label}
            </label>

            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-3 text-gray-500 dark:text-gray-300"
            >
                {show ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
        </div>
    );
}
