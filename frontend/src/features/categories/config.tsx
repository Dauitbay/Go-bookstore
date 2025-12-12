import GenericCrudPage from "../../components/crud/GenericCrudPage";
import * as api from "./api";
import CategoryForm from "./Form";
import config from "tailwindcss/defaultConfig";

export const CategoriesConfig = {
    resource: "categories",
    title: "Categories",
    columns: [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "description", title: "Description" }
    ],
    fetchList: api.fetchCategories,
    createFn: api.createCategory,
    updateFn: api.updateCategory,
    deleteFn: api.deleteCategory,
    FormComponent: CategoryForm
};

export default function CategoriesPage() {
    return <GenericCrudPage config={CategoriesConfig} />;
}
