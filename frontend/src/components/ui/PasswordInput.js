import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
export function PasswordInput({ label, value, onChange }) {
    const [show, setShow] = React.useState(false);
    return (_jsxs("div", { className: "relative w-full my-4", children: [_jsx("input", { type: show ? "text" : "password", value: value, onChange: onChange, className: "\n                    peer w-full px-4 py-3\n                    text-base sm:text-lg\n                    rounded-xl border\n                    dark:bg-slate-800 dark:border-slate-600\n                    border-gray-300\n                    outline-none transition-all\n                    focus:border-blue-500 dark:focus:border-blue-400\n                    placeholder-transparent\n                ", placeholder: label }), _jsx("label", { className: `absolute left-4 top-3 
                    text-gray-500 dark:text-gray-400 transition-all
                    peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-blue-600
                    ${value && "top-[-10px] text-xs text-blue-600"}
                `, children: label }), _jsx("button", { type: "button", onClick: () => setShow(!show), className: "absolute right-4 top-3 text-gray-500 dark:text-gray-300", children: show ? _jsx(EyeOff, { size: 22 }) : _jsx(Eye, { size: 22 }) })] }));
}
