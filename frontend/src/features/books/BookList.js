import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
export function BookList({ books, onEdit, onDelete, }) {
    const columns = [
        { key: "ID", title: "ID" },
        { key: "Title", title: "Title" },
        { key: "AuthorName", title: "Author" },
        { key: "Publication", title: "Publication" },
        {
            key: "__actions",
            title: "Actions",
            render: (b) => (_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "secondary", onClick: () => onEdit(b), children: "Edit" }), _jsx(Button, { variant: "danger", onClick: () => onDelete(b.ID), children: "Delete" })] })),
        },
    ];
    return _jsx(Table, { columns: columns, data: books });
}
