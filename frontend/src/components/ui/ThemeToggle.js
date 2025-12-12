import { jsx as _jsx } from "react/jsx-runtime";
import { useStore } from "../../store/useStore";
export const ThemeToggle = () => {
    const dark = useStore((s) => s.dark);
    const toggle = useStore((s) => s.toggleDark);
    return (_jsx("button", { onClick: toggle, className: "px-2 py-1 rounded border dark:border-slate-600", children: dark ? "Light" : "Dark" }));
};
