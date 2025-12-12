import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatedInput } from "../../components/ui/AnimatedInput";
import { PasswordInput } from "../../components/ui/PasswordInput";
import { Spinner } from "../../components/ui/Spinner";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";
export default function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [remember, setRemember] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { login } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.push("Logged in");
            navigate("/books");
        }
        catch (err) {
            toast.push(err.message || "Login failed");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs(AuthLayout, { children: [_jsx("h1", { className: "\n                text-3xl font-bold text-center mb-6 dark:text-white\n                animate-[fade-in_0.4s_ease-out,slide-up_0.5s_cubic-bezier(0.16,1,0.3,1)]\n            ", children: "Welcome Back" }), _jsxs("form", { onSubmit: onSubmit, className: "space-y-4", children: [_jsx(AnimatedInput, { label: "Email", type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(PasswordInput, { label: "Password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsxs("label", { className: "\n                        flex items-center gap-2 mt-1\n                        text-gray-700 dark:text-gray-300\n                        active:scale-[0.98] transition\n                        select-none cursor-pointer\n                    ", children: [_jsx("input", { type: "checkbox", checked: remember, onChange: (e) => setRemember(e.target.checked), className: "w-4 h-4 accent-blue-600" }), "Remember me"] }), _jsx("button", { type: "submit", disabled: loading, className: "\n                        w-full py-3 sm:py-4\n                        rounded-xl text-white font-semibold\n                        bg-blue-600 hover:bg-blue-700\n                        disabled:bg-blue-400\n                        transition-all\n                        flex items-center justify-center\n                        active:scale-[0.98]\n                        shadow-md\n                    ", children: loading ? _jsx(Spinner, { size: 22 }) : "Login" })] }), _jsxs("p", { className: "mt-6 text-center text-sm text-gray-600 dark:text-gray-400", children: ["Don't have an account?", _jsx(Link, { to: "/register", className: "text-blue-600 dark:text-blue-400 ml-1 hover:underline", children: "Register" })] })] }));
}
