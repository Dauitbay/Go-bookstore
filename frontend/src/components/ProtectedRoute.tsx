// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { me } from "../features/auth/AuthService";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const token = useStore((s) => s.token);
    const setUser = useStore((s) => s.setUser);
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        async function verify() {
            if (!token) {
                setChecked(true);
                return;
            }

            try {
                const user = await me();
                setUser(user);
            } catch {
                useStore.getState().setToken(null);
                useStore.getState().setRefreshToken(null);
            }

            setChecked(true);
        }

        verify();
    }, [token]);

    if (!checked) return <div>Loading...</div>;

    if (!token) return <Navigate to="/login" replace />;

    return children;
}
