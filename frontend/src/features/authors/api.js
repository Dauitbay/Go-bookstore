// src/features/authors/api.ts
import { http } from "../../lib/https";
// Helper to build query strings
function buildQuery(params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
            query.append(k, String(v));
        }
    });
    return query.toString() ? `?${query.toString()}` : "";
}
// GET /authors?page=?&limit=?&search=
export async function fetchAuthors({ page = 1, limit = 10, search = "", sortBy, sortDir }) {
    const query = buildQuery({
        page,
        limit,
        search,
        sort_by: sortBy,
        sort_dir: sortDir,
    });
    return http.get(`/authors${query}`);
}
// POST /authors
export async function createAuthor(dto) {
    return http.post("/authors", dto);
}
// PUT /authors/:id
export async function updateAuthor(id, dto) {
    return http.put(`/authors/${id}`, dto);
}
// DELETE /authors/:id
export async function deleteAuthor(id) {
    return http.delete(`/authors/${id}`);
}
