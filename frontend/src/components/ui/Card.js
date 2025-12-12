import { jsx as _jsx } from "react/jsx-runtime";
export function Card({ children }) {
    return (_jsx("div", { className: "bg-white dark:bg-slate-800 shadow-card rounded-xl p-4", children: children }));
}
