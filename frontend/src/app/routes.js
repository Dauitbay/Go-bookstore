import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/app/routes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import BookPage from "../features/books/BookPage";
import AuthorPage from "../features/authors/Form";
import CategoryPage from "../features/categories/Form";
export function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsxs(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(DashboardLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/books" }) }), _jsx(Route, { path: "books", element: _jsx(BookPage, {}) }), _jsx(Route, { path: "authors", element: _jsx(AuthorPage, {}) }), _jsx(Route, { path: "categories", element: _jsx(CategoryPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx(LoginPage, {}) })] }));
}
