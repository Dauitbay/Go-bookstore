import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/globals.css";
import { useStore } from "./store/useStore";

function BodyClassWrapper({ children }: { children: React.ReactNode }) {
    const dark = useStore((s) => s.dark);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return <>{children}</>;
}

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BodyClassWrapper>
            <App />
        </BodyClassWrapper>
    </React.StrictMode>
);
