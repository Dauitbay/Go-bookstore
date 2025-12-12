import React from "react";

export function Input({
                          label,
                          ...props
                      }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
    return (
        <div className="flex flex-col mb-3">
            {label && <label className="mb-1 text-sm">{label}</label>}
            <input
                {...props}
                className="border rounded-xl px-3 py-2 bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
    );
}
