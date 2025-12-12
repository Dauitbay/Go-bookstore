import React from "react";
import { Table } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import { Book } from "./types";

export function BookList({
                             books,
                             onEdit,
                             onDelete,
                         }: {
    books: Book[];
    onEdit: (b: Book) => void;
    onDelete: (id: number) => void;
}) {
    const columns = [
        { key: "ID", title: "ID" },
        { key: "Title", title: "Title" },
        { key: "AuthorName", title: "Author" },
        { key: "Publication", title: "Publication" },
        {
            key: "__actions",
            title: "Actions",
            render: (b: Book) => (
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => onEdit(b)}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(b.ID)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return <Table columns={columns} data={books} />;
}
