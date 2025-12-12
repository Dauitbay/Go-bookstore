import { useStore } from "../store/useStore";
import { http } from "../lib/https";
import React from "react";
import {Link} from "react-router-dom";

export function Sidebar() {
    const menu = useStore((s) => s.menu);
    const setMenu = useStore((s) => s.setMenu);
    const user = useStore((s) => s.user);

    React.useEffect(() => {
        (async () => {
            try {
                const items = await http.get("/menu");

                // filter by permission
                const filtered = items.filter(
                    (m: any) => !m.perm || user?.Permissions?.includes(m.perm)
                );

                setMenu(filtered);
            } catch {
                setMenu([
                    { title: "Books", path: "/books" },
                    { title: "Authors", path: "/authors" },
                    { title: "Categories", path: "/categories" }
                ]);
            }
        })();
    }, [user, setMenu]);

    return (
        <aside className="w-64 p-4">
            <nav>
                {menu.map((m) => (
                    <Link key={m.path} to={m.path}>
                        {m.title}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
