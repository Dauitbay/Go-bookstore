import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AnimatedInput({ label, value, type = "text", autoComplete, onChange }) {
    return (_jsxs("div", { className: "relative w-full my-4", children: [_jsx("input", { type: type, value: value, autoComplete: autoComplete, onChange: onChange, className: "peer w-full px-4 py-3 border rounded-xl outline-none\n                           transition-all dark:bg-slate-800 dark:border-slate-600\n                           border-gray-300 focus:border-blue-500 dark:focus:border-blue-400" }), _jsx("label", { className: `
                    absolute left-4 top-3 text-gray-500 dark:text-gray-400 
                    transition-all pointer-events-none 
                    peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600
                    ${value && "top-[-10px] left-2 text-xs text-blue-600"}
                `, children: label })] }));
}
