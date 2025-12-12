import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Table } from "../ui/Table";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
export default function GenericCrudPage({ config }) {
    const { title, columns, fetchList, createFn, updateFn, deleteFn, FormComponent } = config;
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [search, setSearch] = React.useState("");
    const [sortBy, setSortBy] = React.useState(null);
    const [sortDir, setSortDir] = React.useState("asc");
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const createModal = useModal();
    const editModal = useModal();
    const [editing, setEditing] = React.useState(null);
    const toast = useToast();
    const load = React.useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchList({ page, limit, search, sortBy, sortDir });
            setData(res.items || []);
            setTotal(res.total || 0);
        }
        catch (e) {
            toast.push("Load failed: " + e.message);
        }
        finally {
            setLoading(false);
        }
    }, [page, limit, search, sortBy, sortDir, fetchList, toast]);
    React.useEffect(() => {
        load();
    }, [load]);
    const onDelete = async (id) => {
        try {
            await deleteFn(id);
            toast.push("Deleted");
            load();
        }
        catch (e) {
            toast.push("Delete failed: " + e.message);
        }
    };
    const onSort = (key) => {
        if (sortBy === key)
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else {
            setSortBy(key);
            setSortDir("asc");
        }
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-semibold", children: title }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { placeholder: "Search...", className: "border p-2 rounded", value: search, onChange: (e) => setSearch(e.target.value) }), _jsx(Button, { onClick: () => { setPage(1); load(); }, children: "Search" }), _jsx(Button, { onClick: createModal.open, children: "+ Add" })] })] }), loading ? _jsx("div", { children: "Loading..." }) : _jsx(Table, { columns: [...columns, { key: "__actions", title: "Actions" }], data: data, onSort: onSort, sortBy: sortBy, sortDir: sortDir }), _jsxs("div", { className: "flex items-center justify-between mt-4", children: [_jsxs("div", { children: ["Showing ", (page - 1) * limit + 1, " - ", Math.min(page * limit, total), " of ", total] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { onClick: () => setPage((p) => Math.max(1, p - 1)), children: "Prev" }), _jsxs("div", { children: ["Page ", page] }), _jsx(Button, { onClick: () => setPage((p) => p + 1), children: "Next" }), _jsx("select", { value: limit, onChange: (e) => setLimit(Number(e.target.value)), className: "border p-1 rounded", children: [10, 20, 50, 100].map((n) => (_jsx("option", { value: n, children: n }, n))) })] })] }), _jsx(Modal, { isOpen: createModal.isOpen, onClose: createModal.close, title: `Create ${title}`, children: _jsx(FormComponent, { initial: null, onSubmit: async (dto) => {
                        try {
                            await createFn(dto);
                            toast.push("Created");
                            createModal.close();
                            load();
                        }
                        catch (e) {
                            toast.push("Create failed: " + e.message);
                        }
                    }, onCancel: createModal.close }) }), _jsx(Modal, { isOpen: editModal.isOpen, onClose: () => { editModal.close(); setEditing(null); }, title: `Edit ${title}`, children: _jsx(FormComponent, { initial: editing, onSubmit: async (dto) => {
                        try {
                            await updateFn(editing.id || editing.ID, dto);
                            toast.push("Updated");
                            editModal.close();
                            setEditing(null);
                            load();
                        }
                        catch (e) {
                            toast.push("Update failed: " + e.message);
                        }
                    }, onCancel: () => { editModal.close(); setEditing(null); } }) })] }));
}
