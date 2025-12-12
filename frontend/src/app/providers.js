import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../lib/queryClient";
import { ToastProvider } from "../hooks/useToast";
export function Providers({ children }) {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ToastProvider, { children: _jsx(BrowserRouter, { children: children }) }) }));
}
