import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
export default function BookForm({ initial, onSubmit, onCancel, }) {
    const [name, setName] = React.useState(initial?.name || "");
    const [author, setAuthor] = React.useState(initial?.author || "");
    const [publication, setPublication] = React.useState(initial?.publication || "");
    return (_jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            onSubmit({ name, author, publication });
        }, className: "space-y-4", children: [_jsx(Input, { label: "Name", value: name, onChange: (e) => setName(e.target.value), required: true }), _jsx(Input, { label: "Author", value: author, onChange: (e) => setAuthor(e.target.value), required: true }), _jsx(Input, { label: "Publication", value: publication, onChange: (e) => setPublication(e.target.value) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "secondary", type: "button", onClick: onCancel, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Save" })] })] }));
}
