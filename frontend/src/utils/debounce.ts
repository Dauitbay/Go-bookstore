export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
    let t: any;
    return (...args: any[]) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}
