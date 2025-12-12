import { create } from "zustand";

export type MenuItem = { title: string; path: string; perm?: string };

export type User = {
    ID: number;
    Name: string;
    Email: string;
    Roles?: string[];
    Permissions?: string[];
};

type UIState = {
    dark: boolean;
    toggleDark: () => void;

    menu: MenuItem[];
    setMenu: (m: MenuItem[]) => void;

    token: string | null;
    setToken: (t: string | null) => void;

    refreshToken: string | null;
    setRefreshToken: (t: string | null) => void;

    expiresAt: number | null;
    setExpiresAt: (exp: number | null) => void;

    user: User | null;
    setUser: (u: User | null) => void;

    loadingCount: number;
    addLoading: () => void;
    removeLoading: () => void;
    isLoading: () => boolean;
};

export const useStore = create<UIState>((set, get) => ({
    // --------------- UI ---------------
    dark: localStorage.getItem("theme") === "dark",

    toggleDark: () =>
        set((s) => {
            const value = !s.dark;
            localStorage.setItem("theme", value ? "dark" : "light");
            return { dark: value };
        }),


    // --------------- Menu ---------------
    menu: [],
    setMenu: (m) => set({ menu: m }),

    // --------------- User ---------------
    user: null,
    setUser: (u) => set({ user: u }),

    // --------------- Tokens ---------------
    token: localStorage.getItem("token"),
    setToken: (t) => {
        if (!t) {
            localStorage.removeItem("token");
            return set({ token: null });
        }
        localStorage.setItem("token", t);
        return set({ token: t });
    },

    refreshToken: localStorage.getItem("refreshToken"),
    setRefreshToken: (t) => {
        if (!t) {
            localStorage.removeItem("refreshToken");
            return set({ refreshToken: null });
        }
        localStorage.setItem("refreshToken", t);
        return set({ refreshToken: t });
    },

    // --------------- Expiration ---------------
    expiresAt: Number(localStorage.getItem("expiresAt")) || null,
    setExpiresAt: (exp) => {
        if (!exp) {
            localStorage.removeItem("expiresAt");
            return set({ expiresAt: null });
        }
        localStorage.setItem("expiresAt", String(exp));
        return set({ expiresAt: exp });
    },

    // --------------- Loading Indicator ---------------
    loadingCount: 0,
    addLoading: () => set((s) => ({ loadingCount: s.loadingCount + 1 })),
    removeLoading: () => set((s) => ({ loadingCount: Math.max(0, s.loadingCount - 1) })),
    isLoading: () => get().loadingCount > 0,
}));
