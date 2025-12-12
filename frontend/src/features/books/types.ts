
export interface Book {
    ID: number;
    name: string;
    author: string;
    publication?: string;
}

export type CreateBookDTO = {
    name: string;
    author: string;
    publication?: string;
};

export type UpdateBookDTO = Partial<CreateBookDTO>;
