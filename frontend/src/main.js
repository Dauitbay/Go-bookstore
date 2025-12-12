import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/globals.css";
import { useStore } from "./store/useStore";
function BodyClassWrapper({ children }) {
    const dark = useStore((s) => s.dark);
    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);
    return _jsx(_Fragment, { children: children });
}
createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(BodyClassWrapper, { children: _jsx(App, {}) }) }));
