import { jsx as _jsx } from "react/jsx-runtime";
import { useStore } from "../store/useStore";
import { http } from "../lib/https";
import React from "react";
import { Link } from "react-router-dom";
export function Sidebar() {
    const menu = useStore((s) => s.menu);
    const setMenu = useStore((s) => s.setMenu);
    const user = useStore((s) => s.user);
    React.useEffect(() => {
        (async () => {
            try {
                const items = await http.get("/menu");
                // filter by permission
                const filtered = items.filter((m) => !m.perm || user?.Permissions?.includes(m.perm));
                setMenu(filtered);
            }
            catch {
                setMenu([
                    { title: "Books", path: "/books" },
                    { title: "Authors", path: "/authors" },
                    { title: "Categories", path: "/categories" }
                ]);
            }
        })();
    }, [user, setMenu]);
    return (_jsx("aside", { className: "w-64 p-4", children: _jsx("nav", { children: menu.map((m) => (_jsx(Link, { to: m.path, children: m.title }, m.path))) }) }));
}
