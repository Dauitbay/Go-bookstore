import React from "react";
import { useStore } from "../../store/useStore";

export const ThemeToggle = () => {
    const dark = useStore((s) => s.dark);
    const toggle = useStore((s) => s.toggleDark);
    return (
        <button onClick={toggle} className="px-2 py-1 rounded border dark:border-slate-600">
            {dark ? "Light" : "Dark"}
        </button>
    );
};
