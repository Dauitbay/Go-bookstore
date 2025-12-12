import React, { createContext, useContext, useState } from "react";

type Toast = { id: string; message: string };

const ToastContext = createContext<{ push: (m: string) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const push = (message: string) => {
        const t = { id: Date.now().toString(), message };
        setToasts((s) => [...s, t]);
        setTimeout(() => setToasts((s) => s.filter((x) => x.id !== t.id)), 4000);
    };

    return (
        <ToastContext.Provider value={{ push }}>
            {children}
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
                {toasts.map((t) => (
                    <div key={t.id} className="bg-black text-white p-3 rounded shadow">
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx;
}
