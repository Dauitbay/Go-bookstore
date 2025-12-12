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

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password);
            toast.push("Account created");
            navigate("/login");
        } catch (err: any) {
            toast.push(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
                Create Account
            </h1>

            <form onSubmit={onSubmit}>
                <AnimatedInput
                    label="Name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />

                <AnimatedInput
                    label="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />

                <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                               text-white py-3 rounded-xl transition font-semibold flex items-center justify-center"
                >
                    {loading ? <Spinner /> : "Register"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?
                <Link to="/login" className="text-blue-600 dark:text-blue-400 ml-1 hover:underline">
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
}
