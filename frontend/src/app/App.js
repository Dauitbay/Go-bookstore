import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Providers } from "./providers";
import { AppRoutes } from "./routes";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useStore } from "../store/useStore";
function ThemeSync({ children }) {
    const dark = useStore((s) => s.dark);
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);
    return _jsx(_Fragment, { children: children });
}
export function App() {
    return (_jsx(Providers, { children: _jsx(ThemeSync, { children: _jsx(ErrorBoundary, { children: _jsx(AppRoutes, {}) }) }) }));
}
