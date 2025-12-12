export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-slate-800 shadow-card rounded-xl p-4">
            {children}
        </div>
    );
}
