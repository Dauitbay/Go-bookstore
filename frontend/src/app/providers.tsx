import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../lib/queryClient";
import { ToastProvider } from "../hooks/useToast";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <BrowserRouter>{children}</BrowserRouter>
            </ToastProvider>
        </QueryClientProvider>
    );
}
