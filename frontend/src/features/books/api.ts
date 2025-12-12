import { http } from "../../lib/https";

export async function getBooks(params?: any) {
    const q = new URLSearchParams(params).toString();
    return http.get(`/book?${q}`);
}

export async function getBook(id: number) {
    return http.get(`/book/${id}`);
}

export async function createBook(data: any) {
    return http.post("/book", data);
}

export async function updateBook(id: number, data: any) {
    return http.put(`/book/${id}`, data);
}

export async function deleteBook(id: number) {
    return http.delete(`/book/${id}`);
}
