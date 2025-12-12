import React from "react";
import {
    useBooksQuery,
    useCreateBook,
    useDeleteBook,
    useUpdateBook,
} from "./queries";
import BookForm from "./BookForm";
import { Modal } from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";

import type { Book, CreateBookDTO } from "./types";

export default function BookPage() {
    const params = { page: 1, limit: 20 };
    const { data: res = { items: [], total: 0 }, isLoading } = useBooksQuery(params);

    const books: Book[] = res.items ?? [];

    const create = useCreateBook();
    const update = useUpdateBook();
    const remove = useDeleteBook();

    const createModal = useModal();
    const editModal = useModal();

    const [editing, setEditing] = React.useState<Book | null>(null);
    const toast = useToast();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 text-gray-500">
                Loading books...
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Books</h1>

                <button
                    onClick={createModal.open}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    + Add Book
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border dark:border-slate-700 shadow">
                <table className="min-w-full bg-white dark:bg-slate-800">
                    <thead className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
                    <tr>
                        <th className="text-left px-4 py-3">ID</th>
                        <th className="text-left px-4 py-3">Name</th>
                        <th className="text-left px-4 py-3">Author</th>
                        <th className="text-left px-4 py-3">Publication</th>
                        <th className="text-left px-4 py-3 w-32">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {books.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-10 text-gray-500">
                                No books found.
                            </td>
                        </tr>
                    )}

                    {books.map((b: Book) => (
                        <tr
                            key={b.ID}
                            className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                        >
                            <td className="px-4 py-3">{b.ID}</td>
                            <td className="px-4 py-3 font-medium">{b.name}</td>
                            <td className="px-4 py-3">{b.author}</td>
                            <td className="px-4 py-3">{b.publication || "-"}</td>

                            <td className="px-4 py-3 flex gap-2">
                                <button
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    onClick={() => {
                                        setEditing(b);
                                        editModal.open();
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={() =>
                                        remove.mutate(b.ID, {
                                            onSuccess: () => toast.push("Deleted"),
                                            onError: () => toast.push("Delete failed"),
                                        })
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Create modal */}
            <Modal isOpen={createModal.isOpen} onClose={createModal.close} title="Add Book">
                <BookForm
                    onCancel={createModal.close}
                    onSubmit={async (dto: CreateBookDTO) => {
                        try {
                            await create.mutateAsync(dto);
                            toast.push("Created");
                            createModal.close();
                        } catch (err: any) {
                            toast.push("Create failed: " + err.message);
                        }
                    }}
                />
            </Modal>

            {/* Edit modal */}
            <Modal
                isOpen={editModal.isOpen}
                onClose={() => {
                    editModal.close();
                    setEditing(null);
                }}
                title="Edit Book"
            >
                <BookForm
                    initial={editing ?? undefined}
                    onCancel={() => {
                        editModal.close();
                        setEditing(null);
                    }}
                    onSubmit={async (dto: CreateBookDTO) => {
                        try {
                            await update.mutateAsync({ id: editing!.ID, data: dto });
                            toast.push("Updated");
                            editModal.close();
                            setEditing(null);
                        } catch (err: any) {
                            toast.push("Update failed: " + err.message);
                        }
                    }}
                />
            </Modal>
        </div>
    );
}
