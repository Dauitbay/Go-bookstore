const API = "http://localhost:9010";

async function register(email, password, name) {
    const res = await fetch(API + "/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password, name })
    });
    if (!res.ok) throw new Error("register failed");
    const data = await res.json();
    saveTokensFromAuthResponse(data);
    return data;
}

async function login(email, password) {
    const res = await fetch(API + "/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error("login failed");
    const data = await res.json();
    saveTokensFromAuthResponse(data);
    return data;
}

function saveTokensFromAuthResponse(data) {
    // backend returns { user: {...}, token: { access_token, refresh_token, expires_at } }
    if (!data || !data.token) {
        console.error("Invalid auth response", data);
        return;
    }
    localStorage.setItem("access_token", data.token.access_token);
    localStorage.setItem("refresh_token", data.token.refresh_token);
    localStorage.setItem("refresh_expires_at", data.token.expires_at);
}

function getAccessToken() { return localStorage.getItem("access_token"); }
function getRefreshToken() { return localStorage.getItem("refresh_token"); }

async function authFetch(url, opts = {}) {
    opts.headers = opts.headers || {};
    const token = getAccessToken();
    if (token) opts.headers["Authorization"] = "Bearer " + token;

    let res = await fetch(url, opts);
    if (res.status !== 401) return res;

    // attempt refresh
    const ref = getRefreshToken();
    if (!ref) {
        logout();
        throw new Error("not authenticated");
    }
    const refreshRes = await fetch(API + "/auth/refresh", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ refresh_token: ref })
    });
    if (!refreshRes.ok) {
        logout();
        throw new Error("session expired");
    }
    const newTokens = await refreshRes.json();
    // refresh endpoint returns { token: { access_token, refresh_token, expires_at } } or direct token object
    const tokenObj = newTokens.token || newTokens;
    if (tokenObj.access_token) {
        localStorage.setItem("access_token", tokenObj.access_token);
    }
    if (tokenObj.refresh_token) {
        localStorage.setItem("refresh_token", tokenObj.refresh_token);
    }
    return fetch(url, opts);
}

function logout() {
    const refresh = getRefreshToken();
    if (refresh) {
        fetch(API + "/auth/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ refresh_token: refresh })
        }).catch(()=>{});
    }
    localStorage.clear();
    window.location.href = "/login.html";
}

async function logoutAll() {
    await authFetch(API + "/auth/logout-all", { method: "POST" });
    logout();
}
