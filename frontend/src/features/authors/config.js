import { jsx as _jsx } from "react/jsx-runtime";
import GenericCrudPage from "../../components/crud/GenericCrudPage";
import * as api from "./api";
import AuthorForm from "./Form";
export const AuthorsConfig = {
    resource: "authors",
    title: "Authors",
    columns: [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "bio", title: "Bio" }
    ],
    fetchList: api.fetchAuthors,
    createFn: api.createAuthor,
    updateFn: api.updateAuthor,
    deleteFn: api.deleteAuthor,
    FormComponent: AuthorForm
};
export default function AuthorsPage() {
    return _jsx(GenericCrudPage, { config: AuthorsConfig });
}
