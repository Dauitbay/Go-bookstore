export function logError(err, info) {
    console.error(err, info);
    try {
        fetch((import.meta.env.VITE_API_BASE || "") + "/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: String(err), info })
        });
    }
    catch {
        // ignore logging errors
    }
}
