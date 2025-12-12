import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./api";
import {UpdateBookDTO} from "@/features/books/types";

// LIST
export function useBooksQuery(params?: any) {
    return useQuery({
        queryKey: ["books", params],
        queryFn: () => api.getBooks(params),
    });
}

// CREATE
export function useCreateBook() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: api.createBook,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
    });
}

// UPDATE
export function useUpdateBook() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateBookDTO }) =>
            api.updateBook(id, data),
        onSuccess: (_res, variables) => {
            qc.invalidateQueries({ queryKey: ["books"] });
            qc.invalidateQueries({ queryKey: ["book", variables.id] });
        },
    });
}

// DELETE
export function useDeleteBook() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: api.deleteBook,
        onSuccess: () => qc.invalidateQueries({ queryKey: ["books"] }),
    });
}
