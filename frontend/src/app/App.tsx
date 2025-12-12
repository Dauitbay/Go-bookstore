import React, { useEffect } from "react";
import { Providers } from "./providers";
import { AppRoutes } from "./routes";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useStore } from "../store/useStore";

function ThemeSync({ children }: { children: React.ReactNode }) {
    const dark = useStore((s) => s.dark);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return <>{children}</>;
}

export function App() {
    return (
        <Providers>
            <ThemeSync>
                <ErrorBoundary>
                    <AppRoutes />
                </ErrorBoundary>
            </ThemeSync>
        </Providers>
    );
}
