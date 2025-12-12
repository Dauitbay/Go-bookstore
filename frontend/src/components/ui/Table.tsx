import React from "react";

type Column<T> = { key: keyof T | string; title: string; sortable?: boolean; render?: (row: T) => React.ReactNode };

export function Table<T>({ columns, data, onSort, sortBy, sortDir }: { columns: Column<T>[]; data: T[]; onSort?: (k: string) => void; sortBy?: string | null; sortDir?: "asc" | "desc" }) {
    return (
        <table className="w-full table-auto border-collapse">
            <thead>
            <tr className="bg-gray-100 dark:bg-slate-700">
                {columns.map((c) => (
                    <th key={String(c.key)} className="p-2 text-left">
                        {c.sortable ? (
                            <button onClick={() => onSort && onSort(String(c.key))} className="flex items-center gap-2">
                                <span>{c.title}</span>
                                {sortBy === String(c.key) && <span>{sortDir === "asc" ? "▲" : "▼"}</span>}
                            </button>
                        ) : (
                            c.title
                        )}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row: any, i) => (
                <tr key={i} className="even:bg-gray-50 dark:even:bg-slate-800">
                    {columns.map((c) => (
                        <td key={String(c.key)} className="p-2 align-top">
                            {c.render ? c.render(row) : row[c.key as keyof typeof row]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
