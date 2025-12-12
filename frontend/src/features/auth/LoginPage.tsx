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

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);

            toast.push("Logged in");
            navigate("/books");
        } catch (err: any) {
            toast.push(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout>
            {/* page title animation */}
            <h1
                className="
                text-3xl font-bold text-center mb-6 dark:text-white
                animate-[fade-in_0.4s_ease-out,slide-up_0.5s_cubic-bezier(0.16,1,0.3,1)]
            "
            >
                Welcome Back
            </h1>

            <form onSubmit={onSubmit} className="space-y-4">
                <AnimatedInput
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />

                <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                <label
                    className="
                        flex items-center gap-2 mt-1
                        text-gray-700 dark:text-gray-300
                        active:scale-[0.98] transition
                        select-none cursor-pointer
                    "
                >
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="w-4 h-4 accent-blue-600"
                    />
                    Remember me
                </label>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full py-3 sm:py-4
                        rounded-xl text-white font-semibold
                        bg-blue-600 hover:bg-blue-700
                        disabled:bg-blue-400
                        transition-all
                        flex items-center justify-center
                        active:scale-[0.98]
                        shadow-md
                    "
                >
                    {loading ? <Spinner size={22} /> : "Login"}
                </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?
                <Link
                    to="/register"
                    className="text-blue-600 dark:text-blue-400 ml-1 hover:underline"
                >
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}
