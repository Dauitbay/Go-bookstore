import { http } from "../../lib/https";
import { useStore } from "../../store/useStore";

export async function login(email: string, password: string) {
    const res = await http.post("/auth/login", { email, password });

    const token = res.token;
    if (token) {
        useStore.getState().setToken(token.access_token);
        useStore.getState().setRefreshToken(token.refresh_token);
        useStore.getState().setExpiresAt(token.expires_at);
    }

    useStore.getState().setUser(res.user);

    return res;
}

export function logout() {
    const refreshToken = useStore.getState().refreshToken;
    http.post("/auth/logout", { refreshToken }).catch(() => {});

    useStore.getState().setToken(null);
    useStore.getState().setRefreshToken(null);
    useStore.getState().setUser(null);

    window.location.href = "/login";
}

export async function register(name: string, email: string, password: string) {
    try {
        const res = await http.post("/auth/register", { name, email, password });

        const token = res.token;
        if (token) {
            useStore.getState().setToken(token.access_token);
            useStore.getState().setRefreshToken(token.refresh_token);
            useStore.getState().setExpiresAt(token.expires_at);
        }

        useStore.getState().setUser(res.user);

        return res;
    } catch (err: any) {
        throw new Error(err?.message || "Registration failed");
    }
}

export async function me() {
    return http.get("/auth/me");
}
