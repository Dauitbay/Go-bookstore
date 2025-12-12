import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import { Sun, Moon } from "lucide-react";
export default function DashboardLayout() {
    const dark = useStore((s) => s.dark);
    const toggleDark = useStore((s) => s.toggleDark);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const menu = [
        { title: "Books", path: "/books" },
        { title: "Authors", path: "/authors" },
        { title: "Categories", path: "/categories" },
    ];
    return (_jsxs("div", { className: "min-h-screen flex bg-gray-100 dark:bg-slate-900", children: [_jsxs("aside", { className: "w-64 bg-white dark:bg-slate-800 border-r dark:border-slate-700 p-4 hidden md:block", children: [_jsx("div", { className: "font-bold text-xl dark:text-white mb-6", children: "Dashboard" }), _jsx("nav", { className: "space-y-2", children: menu.map((m) => (_jsx(Link, { to: m.path, className: "block p-2 rounded text-gray-700 dark:text-gray-200\n                                       hover:bg-gray-100 dark:hover:bg-slate-700", children: m.title }, m.path))) })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("header", { className: "h-14 px-6 flex items-center justify-between\n                                   bg-white dark:bg-slate-800 border-b dark:border-slate-700 shadow-sm", children: [_jsx("button", { className: "md:hidden text-gray-700 dark:text-gray-200", onClick: () => navigate("/"), children: "\u2630" }), _jsx("div", { className: "font-semibold text-gray-800 dark:text-white text-lg", children: "Admin Panel" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: toggleDark, className: "p-2 rounded bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200", children: dark ? _jsx(Sun, { size: 18 }) : _jsx(Moon, { size: 18 }) }), _jsx("button", { onClick: logout, className: "px-3 py-2 text-sm bg-red-600 hover:bg-red-700\n                                       text-white rounded", children: "Logout" })] })] }), _jsx("main", { className: "p-6", children: _jsx(Outlet, {}) })] })] }));
}
