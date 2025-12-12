import React from "react";
import { Button } from "./Button";

export function Modal({
                          isOpen,
                          onClose,
                          title,
                          children,
                      }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                {children}
                <div className="flex justify-end mt-4">
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
