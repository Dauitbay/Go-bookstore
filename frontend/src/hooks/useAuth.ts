import { useCallback } from "react";
import { useStore } from "../store/useStore";
import {
    login as doLogin,
    logout as doLogout,
    register as doRegister
} from "../features/auth/AuthService";

export function useAuth() {
    const token = useStore((s) => s.token);

    const login = useCallback(async (email: string, password: string) => {
        return await doLogin(email, password);
    }, []);

    const register = useCallback(async (name: string, email: string, password: string) => {
        return await doRegister(name, email, password);
    }, []);

    const logout = useCallback(() => {
        doLogout();
    }, []);

    return { token, login, register, logout };
}
