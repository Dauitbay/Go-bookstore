import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useBooksQuery, useCreateBook, useDeleteBook, useUpdateBook, } from "./queries";
import BookForm from "./BookForm";
import { Modal } from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
export default function BookPage() {
    const params = { page: 1, limit: 20 };
    const { data: res = { items: [], total: 0 }, isLoading } = useBooksQuery(params);
    const books = res.items ?? [];
    const create = useCreateBook();
    const update = useUpdateBook();
    const remove = useDeleteBook();
    const createModal = useModal();
    const editModal = useModal();
    const [editing, setEditing] = React.useState(null);
    const toast = useToast();
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64 text-gray-500", children: "Loading books..." }));
    }
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800 dark:text-white", children: "Books" }), _jsx("button", { onClick: createModal.open, className: "px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition", children: "+ Add Book" })] }), _jsx("div", { className: "overflow-hidden rounded-xl border dark:border-slate-700 shadow", children: _jsxs("table", { className: "min-w-full bg-white dark:bg-slate-800", children: [_jsx("thead", { className: "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left px-4 py-3", children: "ID" }), _jsx("th", { className: "text-left px-4 py-3", children: "Name" }), _jsx("th", { className: "text-left px-4 py-3", children: "Author" }), _jsx("th", { className: "text-left px-4 py-3", children: "Publication" }), _jsx("th", { className: "text-left px-4 py-3 w-32", children: "Actions" })] }) }), _jsxs("tbody", { children: [books.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-10 text-gray-500", children: "No books found." }) })), books.map((b) => (_jsxs("tr", { className: "border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition", children: [_jsx("td", { className: "px-4 py-3", children: b.ID }), _jsx("td", { className: "px-4 py-3 font-medium", children: b.name }), _jsx("td", { className: "px-4 py-3", children: b.author }), _jsx("td", { className: "px-4 py-3", children: b.publication || "-" }), _jsxs("td", { className: "px-4 py-3 flex gap-2", children: [_jsx("button", { className: "px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600", onClick: () => {
                                                        setEditing(b);
                                                        editModal.open();
                                                    }, children: "Edit" }), _jsx("button", { className: "px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700", onClick: () => remove.mutate(b.ID, {
                                                        onSuccess: () => toast.push("Deleted"),
                                                        onError: () => toast.push("Delete failed"),
                                                    }), children: "Delete" })] })] }, b.ID)))] })] }) }), _jsx(Modal, { isOpen: createModal.isOpen, onClose: createModal.close, title: "Add Book", children: _jsx(BookForm, { onCancel: createModal.close, onSubmit: async (dto) => {
                        try {
                            await create.mutateAsync(dto);
                            toast.push("Created");
                            createModal.close();
                        }
                        catch (err) {
                            toast.push("Create failed: " + err.message);
                        }
                    } }) }), _jsx(Modal, { isOpen: editModal.isOpen, onClose: () => {
                    editModal.close();
                    setEditing(null);
                }, title: "Edit Book", children: _jsx(BookForm, { initial: editing ?? undefined, onCancel: () => {
                        editModal.close();
                        setEditing(null);
                    }, onSubmit: async (dto) => {
                        try {
                            await update.mutateAsync({ id: editing.ID, data: dto });
                            toast.push("Updated");
                            editModal.close();
                            setEditing(null);
                        }
                        catch (err) {
                            toast.push("Update failed: " + err.message);
                        }
                    } }) })] }));
}
