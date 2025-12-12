import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
export function Button({ variant = "primary", className, ...props }) {
    const base = "px-4 py-2 rounded-xl font-medium shadow-sm transition-colors disabled:opacity-50";
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-dark",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };
    return (_jsx("button", { className: clsx(base, variants[variant], className), ...props }));
}
