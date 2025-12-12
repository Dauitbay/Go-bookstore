// src/features/authors/api.ts
import { http } from "../../lib/https";
import type { Author, CreateAuthorDTO, UpdateAuthorDTO } from "./types";

// Helper to build query strings
function buildQuery(params: Record<string, any>) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
            query.append(k, String(v));
        }
    });
    return query.toString() ? `?${query.toString()}` : "";
}

// GET /authors?page=?&limit=?&search=
export async function fetchAuthors({
                                       page = 1,
                                       limit = 10,
                                       search = "",
                                       sortBy,
                                       sortDir
                                   }: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortDir?: string;
}) {
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
export async function createAuthor(dto: CreateAuthorDTO) {
    return http.post("/authors", dto);
}

// PUT /authors/:id
export async function updateAuthor(id: number, dto: UpdateAuthorDTO) {
    return http.put(`/authors/${id}`, dto);
}

// DELETE /authors/:id
export async function deleteAuthor(id: number) {
    return http.delete(`/authors/${id}`);
}
