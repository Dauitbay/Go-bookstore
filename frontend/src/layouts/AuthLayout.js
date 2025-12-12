import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStore } from "../store/useStore";
export default function AuthLayout({ children }) {
    const dark = useStore((s) => s.dark);
    const toggleDark = useStore((s) => s.toggleDark);
    return (_jsxs("div", { className: `
                min-h-screen flex items-center justify-center
                px-4 sm:px-6 md:px-0
                transition-all duration-500
                ${dark
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100"}
            `, children: [_jsx("button", { onClick: toggleDark, className: `
                    fixed sm:absolute top-4 right-4 z-50 text-sm
                    px-3 py-1.5 rounded-full shadow-md
                    transition-all duration-300
                    backdrop-blur-md
                    ${dark
                    ? "bg-slate-700/70 text-gray-100 hover:bg-slate-700"
                    : "bg-white/80 text-gray-800 hover:bg-white"}
                `, children: dark ? "Light" : "Dark" }), _jsx("div", { className: `
                    w-full 
                    max-w-md 
                    sm:max-w-lg 
                    p-6 sm:p-8 md:p-10 
                    rounded-2xl shadow-xl
                    transform transition-all duration-500
                    animate-[fade-in_0.4s_ease-out,slide-up_0.6s_cubic-bezier(0.16,1,0.3,1)]
                    ${dark ? "bg-slate-800 text-white" : "bg-white text-gray-900"}
                `, children: children })] }));
}
