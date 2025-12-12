export function logError(err: any, info?: any) {
    console.error(err, info);
    try {
        fetch(((import.meta.env.VITE_API_BASE as string) || "") + "/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: String(err), info })
        });
    } catch {
        // ignore logging errors
    }
}
