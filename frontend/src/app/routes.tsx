// src/app/routes.tsx
import {Routes, Route, Navigate} from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import BookPage from "../features/books/BookPage";
import AuthorPage from "../features/authors/Form";
import CategoryPage from "../features/categories/Form";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/books" />} />
                <Route path="books" element={<BookPage />} />
                <Route path="authors" element={<AuthorPage />} />
                <Route path="categories" element={<CategoryPage />} />
            </Route>

    {/* Fallback */}
            <Route path="*" element={<LoginPage />} />
        </Routes>
    );
}
