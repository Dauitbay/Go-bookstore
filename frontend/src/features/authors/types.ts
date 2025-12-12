export interface Author {
    id: number;
    name: string;
    bio?: string;
}

export type CreateAuthorDTO = Omit<Author, "id">;
export type UpdateAuthorDTO = Partial<CreateAuthorDTO>;
