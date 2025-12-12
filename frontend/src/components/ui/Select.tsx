import React from "react";

type Option = { value: string | number; label: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    options: Option[];
};

export const Select: React.FC<Props> = ({ label, options, className, ...rest }) => (
    <label className="block">
        {label && <div className="mb-1 text-sm text-gray-700 dark:text-slate-200">{label}</div>}
        <select className={"w-full border p-2 rounded dark:bg-slate-800 dark:border-slate-700 " + (className || "")} {...rest}>
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    </label>
);
