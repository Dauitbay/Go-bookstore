import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatedInput } from "../../components/ui/AnimatedInput";
import { PasswordInput } from "../../components/ui/PasswordInput";
import { Spinner } from "../../components/ui/Spinner";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import AuthLayout from "../../layouts/AuthLayout";
export default function RegisterPage() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { register } = useAuth();
    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password);
            toast.push("Account created");
            navigate("/login");
        }
        catch (err) {
            toast.push(err.message || "Registration failed");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsxs(AuthLayout, { children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-6 dark:text-white", children: "Create Account" }), _jsxs("form", { onSubmit: onSubmit, children: [_jsx(AnimatedInput, { label: "Name", value: name, onChange: (e) => setName(e.target.value) }), _jsx(AnimatedInput, { label: "Email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(PasswordInput, { label: "Password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400\n                               text-white py-3 rounded-xl transition font-semibold flex items-center justify-center", children: loading ? _jsx(Spinner, {}) : "Register" })] }), _jsxs("p", { className: "mt-6 text-center text-sm text-gray-600 dark:text-gray-400", children: ["Already have an account?", _jsx(Link, { to: "/login", className: "text-blue-600 dark:text-blue-400 ml-1 hover:underline", children: "Login" })] })] }));
}
