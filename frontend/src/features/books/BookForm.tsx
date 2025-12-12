import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { CreateBookDTO, Book } from "./types";

export default function BookForm({
                                     initial,
                                     onSubmit,
                                     onCancel,
                                 }: {
    initial?: Partial<Book>;
    onSubmit: (dto: CreateBookDTO) => void | Promise<void>;
    onCancel?: () => void;
}) {
    const [name, setName] = React.useState(initial?.name || "");
    const [author, setAuthor] = React.useState(initial?.author || "");
    const [publication, setPublication] = React.useState(initial?.publication || "");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ name, author, publication });
            }}
            className="space-y-4"
        >
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <Input label="Publication" value={publication} onChange={(e) => setPublication(e.target.value)} />

            <div className="flex justify-end gap-2">
                <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
