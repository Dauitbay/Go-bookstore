import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function AuthorForm({ initial, onSubmit, onCancel }: any) {
    const [name, setName] = React.useState(initial?.name || "");
    const [bio, setBio] = React.useState(initial?.bio || "");
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ name, bio });
            }}
            className="space-y-3"
        >
            <Input label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <label className="block">
                <div className="mb-1 text-sm text-gray-700 dark:text-slate-200">Bio</div>
                <textarea className="w-full border p-2 rounded dark:bg-slate-800 dark:border-slate-700" value={bio} onChange={(e) => setBio(e.target.value)} />
            </label>
            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
