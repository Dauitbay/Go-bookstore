import { http } from "../../lib/https";
export async function getBooks(params) {
    const q = new URLSearchParams(params).toString();
    return http.get(`/book?${q}`);
}
export async function getBook(id) {
    return http.get(`/book/${id}`);
}
export async function createBook(data) {
    return http.post("/book", data);
}
export async function updateBook(id, data) {
    return http.put(`/book/${id}`, data);
}
export async function deleteBook(id) {
    return http.delete(`/book/${id}`);
}
