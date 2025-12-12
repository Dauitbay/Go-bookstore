import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
export default function CategoryForm({ initial, onSubmit, onCancel }) {
    const [name, setName] = React.useState(initial?.name || "");
    const [desc, setDesc] = React.useState(initial?.description || "");
    return (_jsxs("form", { onSubmit: (e) => { e.preventDefault(); onSubmit({ name, description: desc }); }, className: "space-y-3", children: [_jsx(Input, { label: "Name", required: true, value: name, onChange: (e) => setName(e.target.value) }), _jsxs("label", { className: "block", children: [_jsx("div", { className: "mb-1 text-sm text-gray-700 dark:text-slate-200", children: "Description" }), _jsx("textarea", { className: "w-full border p-2 rounded dark:bg-slate-800 dark:border-slate-700", value: desc, onChange: (e) => setDesc(e.target.value) })] }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "secondary", onClick: onCancel, type: "button", children: "Cancel" }), _jsx(Button, { type: "submit", children: "Save" })] })] }));
}
