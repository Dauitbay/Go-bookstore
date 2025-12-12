import React from "react";
import { Table } from "../ui/Table";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";

export default function GenericCrudPage({ config }: { config: any }) {
    const { title, columns, fetchList, createFn, updateFn, deleteFn, FormComponent } = config;
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [search, setSearch] = React.useState("");
    const [sortBy, setSortBy] = React.useState<string | null>(null);
    const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
    const [data, setData] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const createModal = useModal();
    const editModal = useModal();
    const [editing, setEditing] = React.useState<any | null>(null);
    const toast = useToast();

    const load = React.useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchList({ page, limit, search, sortBy, sortDir });
            setData(res.items || []);
            setTotal(res.total || 0);
        } catch (e: any) {
            toast.push("Load failed: " + e.message);
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, sortBy, sortDir, fetchList, toast]);

    React.useEffect(() => {
        load();
    }, [load]);

    const onDelete = async (id: number) => {
        try {
            await deleteFn(id);
            toast.push("Deleted");
            load();
        } catch (e: any) {
            toast.push("Delete failed: " + e.message);
        }
    };

    const onSort = (key: string) => {
        if (sortBy === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else {
            setSortBy(key);
            setSortDir("asc");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="flex gap-2">
                    <input placeholder="Search..." className="border p-2 rounded" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button onClick={() => { setPage(1); load(); }}>Search</Button>
                    <Button onClick={createModal.open}>+ Add</Button>
                </div>
            </div>

            {loading ? <div>Loading...</div> : <Table columns={[...columns, { key: "__actions", title: "Actions" }]} data={data} onSort={onSort} sortBy={sortBy} sortDir={sortDir} />}

            <div className="flex items-center justify-between mt-4">
                <div>Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total}</div>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
                    <div>Page {page}</div>
                    <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
                    <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border p-1 rounded">
                        {[10, 20, 50, 100].map((n) => (<option key={n} value={n}>{n}</option>))}
                    </select>
                </div>
            </div>

            <Modal isOpen={createModal.isOpen} onClose={createModal.close} title={`Create ${title}`}>
                <FormComponent initial={null} onSubmit={async (dto: any) => {
                    try {
                        await createFn(dto);
                        toast.push("Created");
                        createModal.close();
                        load();
                    } catch (e: any) {
                        toast.push("Create failed: " + e.message);
                    }
                }} onCancel={createModal.close} />
            </Modal>

            <Modal isOpen={editModal.isOpen} onClose={() => { editModal.close(); setEditing(null); }} title={`Edit ${title}`}>
                <FormComponent initial={editing} onSubmit={async (dto: any) => {
                    try {
                        await updateFn(editing.id || editing.ID, dto);
                        toast.push("Updated");
                        editModal.close();
                        setEditing(null);
                        load();
                    } catch (e: any) {
                        toast.push("Update failed: " + e.message);
                    }
                }} onCancel={() => { editModal.close(); setEditing(null); }} />
            </Modal>
        </div>
    );
}
