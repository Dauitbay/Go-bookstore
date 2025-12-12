// src/lib/http.ts
import { useStore } from "../store/useStore";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:9010";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class HttpError extends Error {
    status?: number;
    data?: any;
    constructor(message: string, status?: number, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

async function request(method: HttpMethod, url: string, body?: any) {
    const store = useStore.getState();
    const token = store.token;

    store.addLoading();

    try {
        const res = await fetch(API_BASE + url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: body ? JSON.stringify(body) : undefined,
            credentials: "include"
        });

        // If unauthorized → try refresh
        if (res.status === 401) {
            const newToken = await refreshAccessToken();
            if (newToken) {
                return request(method, url, body);
            }

            store.setToken(null);
            store.setRefreshToken(null);
            window.location.href = "/login";
            throw new HttpError("Unauthorized", 401);
        }

        // Retry for 502/503/504
        if ([502, 503, 504].includes(res.status)) {
            await new Promise((r) => setTimeout(r, 300));
            return request(method, url, body);
        }

        const json = await res.json().catch(() => ({}));

        if (!res.ok) {
            throw new HttpError(
                json.message || "Request error",
                res.status,
                json
            );
        }

        return json;
    } finally {
        store.removeLoading();
    }
}

export const http = {
    get: (url: string) => request("GET", url),
    post: (url: string, body?: any) => request("POST", url, body),
    put: (url: string, body?: any) => request("PUT", url, body),
    patch: (url: string, body?: any) => request("PATCH", url, body),
    delete: (url: string) => request("DELETE", url)
};

// -------------------------------------
// Refresh Token Logic
// -------------------------------------
async function refreshAccessToken() {
    const store = useStore.getState();
    const refreshToken = store.refreshToken;
    if (!refreshToken) return null;

    try {
        const res = await fetch(API_BASE + "/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken })
        });

        if (!res.ok) return null;

        const json = await res.json();
        const token = json?.token;
        if (!token) return null;

        store.setToken(token.AccessToken);
        store.setRefreshToken(token.RefreshToken);

        return token.AccessToken;
    } catch {
        return null;
    }
}
