import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Input({ label, ...props }) {
    return (_jsxs("div", { className: "flex flex-col mb-3", children: [label && _jsx("label", { className: "mb-1 text-sm", children: label }), _jsx("input", { ...props, className: "border rounded-xl px-3 py-2 bg-white dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary" })] }));
}
