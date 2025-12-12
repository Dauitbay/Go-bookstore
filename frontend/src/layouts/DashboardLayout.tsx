import React from "react";
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

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-slate-900">

            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-800 border-r dark:border-slate-700 p-4 hidden md:block">
                <div className="font-bold text-xl dark:text-white mb-6">Dashboard</div>

                <nav className="space-y-2">
                    {menu.map((m) => (
                        <Link
                            key={m.path}
                            to={m.path}
                            className="block p-2 rounded text-gray-700 dark:text-gray-200
                                       hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                            {m.title}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">

                {/* Top bar */}
                <header className="h-14 px-6 flex items-center justify-between
                                   bg-white dark:bg-slate-800 border-b dark:border-slate-700 shadow-sm">

                    {/* Mobile sidebar button */}
                    <button
                        className="md:hidden text-gray-700 dark:text-gray-200"
                        onClick={() => navigate("/")}
                    >
                        ☰
                    </button>

                    <div className="font-semibold text-gray-800 dark:text-white text-lg">
                        Admin Panel
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-4">

                        {/* Theme toggle */}
                        <button
                            onClick={toggleDark}
                            className="p-2 rounded bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200"
                        >
                            {dark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* Logout button */}
                        <button
                            onClick={logout}
                            className="px-3 py-2 text-sm bg-red-600 hover:bg-red-700
                                       text-white rounded"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
