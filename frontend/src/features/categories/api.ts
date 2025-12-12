import { http } from "../../lib/https";
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from "./types";

export async function fetchCategories({ page = 1, limit = 10, search = "", sortBy, sortDir }: any) {
    const params: any = { page, limit, search };
    if (sortBy) params.sort_by = sortBy;
    if (sortDir) params.sort_dir = sortDir;
    const res = await http.get("/categories", { params });
    return res.data;
}

export async function createCategory(dto: CreateCategoryDTO) {
    const res = await http.post("/categories", dto);
    return res.data;
}

export async function updateCategory(id: number, dto: UpdateCategoryDTO) {
    const res = await http.put(`/categories/${id}`, dto);
    return res.data;
}

export async function deleteCategory(id: number) {
    const res = await http.delete(`/categories/${id}`);
    return res.data;
}
