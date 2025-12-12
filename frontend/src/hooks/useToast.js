import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const ToastContext = createContext(null);
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const push = (message) => {
        const t = { id: Date.now().toString(), message };
        setToasts((s) => [...s, t]);
        setTimeout(() => setToasts((s) => s.filter((x) => x.id !== t.id)), 4000);
    };
    return (_jsxs(ToastContext.Provider, { value: { push }, children: [children, _jsx("div", { className: "fixed bottom-4 right-4 space-y-2 z-50", children: toasts.map((t) => (_jsx("div", { className: "bg-black text-white p-3 rounded shadow", children: t.message }, t.id))) })] }));
}
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx)
        throw new Error("useToast must be used within ToastProvider");
    return ctx;
}
