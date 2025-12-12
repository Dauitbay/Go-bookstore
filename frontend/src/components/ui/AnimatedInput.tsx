import React from "react";

type Props = {
    label: string;
    value: string;
    type?: string;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function AnimatedInput({
                                  label,
                                  value,
                                  type = "text",
                                  autoComplete,
                                  onChange
                              }: Props) {
    return (
        <div className="relative w-full my-4">
            <input
                type={type}
                value={value}
                autoComplete={autoComplete}
                onChange={onChange}
                className="peer w-full px-4 py-3 border rounded-xl outline-none
                           transition-all dark:bg-slate-800 dark:border-slate-600
                           border-gray-300 focus:border-blue-500 dark:focus:border-blue-400"
            />

            <label
                className={`
                    absolute left-4 top-3 text-gray-500 dark:text-gray-400 
                    transition-all pointer-events-none 
                    peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600
                    ${value && "top-[-10px] left-2 text-xs text-blue-600"}
                `}
            >
                {label}
            </label>
        </div>
    );
}
