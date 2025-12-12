/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2563eb",
                "primary-dark": "#1e40af",
                bg: "var(--bg)",
                text: "var(--text)"
            },
            borderRadius: {
                xl: "12px"
            },
            boxShadow: {
                card: "0 2px 8px rgba(0,0,0,0.06)",
            }
        },
    },
    plugins: [],
};
