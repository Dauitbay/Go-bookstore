import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./Button";
export function Modal({ isOpen, onClose, title, children, }) {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black/40 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg shadow-lg", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: title }), children, _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Button, { variant: "secondary", onClick: onClose, children: "Close" }) })] }) }));
}
