export interface Category {
    id: number;
    name: string;
    description?: string;
}
export type CreateCategoryDTO = Omit<Category, "id">;
export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
