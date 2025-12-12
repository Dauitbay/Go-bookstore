import { jsx as _jsx } from "react/jsx-runtime";
export function Spinner({ size = 20 }) {
    return (_jsx("div", { className: "animate-spin rounded-full border-2 border-white border-t-transparent", style: { width: size, height: size } }));
}
