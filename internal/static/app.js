var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API = "http://localhost:9010/book/";
let updateId = null;
let deleteId = null;
document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    // Buttons from header or page
    document.getElementById("openCreateModal").onclick = () => openModal("createModal");
    // Close modal buttons
    document.getElementById("closeCreateModal").onclick = () => closeModal("createModal");
    document.getElementById("closeUpdateModal").onclick = () => closeModal("updateModal");
    document.getElementById("closeDeleteModal").onclick = () => closeModal("deleteModal");
    // Forms
    document.getElementById("createForm").addEventListener("submit", createBook);
    document.getElementById("updateForm").addEventListener("submit", updateBookSubmit);
    // Delete confirm
    document.getElementById("confirmDelete").onclick = confirmDelete;
});
// ----------------------------------------------------------------
// LOAD ALL BOOKS
// ----------------------------------------------------------------
function loadBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API);
        const books = yield res.json();
        const tbody = document.getElementById("books-body");
        tbody.innerHTML = "";
        books.forEach((b) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td class="p-2">${b.ID}</td>
            <td class="p-2">${b.name}</td>
            <td class="p-2">${b.author}</td>
            <td class="p-2">${b.publication}</td>
            <td class="p-2 space-x-3">
                <button class="text-blue-600 hover:text-blue-800"
                    onclick="openUpdate(${b.ID}, '${escapeStr(b.name)}', '${escapeStr(b.author)}', '${escapeStr(b.publication)}')">
                    Edit
                </button>
                <button class="text-red-600 hover:text-red-800"
                    onclick="openDelete(${b.ID})">
                    Delete
                </button>
            </td>
        `;
            tbody.appendChild(tr);
        });
    });
}
// Escape quotes inside strings to avoid breaking HTML
function escapeStr(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}
// ----------------------------------------------------------------
// CREATE BOOK
// ----------------------------------------------------------------
function createBook(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const name = document.getElementById("createName").value;
        const author = document.getElementById("createAuthor").value;
        const publication = document.getElementById("createPublication").value;
        yield fetch(API, {
            method: "POST",
            body: JSON.stringify({ name, author, publication }),
            headers: { "Content-Type": "application/json" }
        });
        closeModal("createModal");
        loadBooks();
    });
}
// ----------------------------------------------------------------
// UPDATE BOOK (open form)
// ----------------------------------------------------------------
function openUpdate(id, name, author, publication) {
    updateId = id;
    document.getElementById("updateName").value = name;
    document.getElementById("updateAuthor").value = author;
    document.getElementById("updatePublication").value = publication;
    openModal("updateModal");
}
// ----------------------------------------------------------------
// UPDATE BOOK (submit)
// ----------------------------------------------------------------
function updateBookSubmit(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (updateId === null)
            return;
        const name = document.getElementById("updateName").value;
        const author = document.getElementById("updateAuthor").value;
        const publication = document.getElementById("updatePublication").value;
        yield fetch(API + updateId, {
            method: "PUT",
            body: JSON.stringify({ name, author, publication }),
            headers: { "Content-Type": "application/json" }
        });
        closeModal("updateModal");
        loadBooks();
    });
}
// ----------------------------------------------------------------
// DELETE BOOK
// ----------------------------------------------------------------
function openDelete(id) {
    deleteId = id;
    openModal("deleteModal");
}
function confirmDelete() {
    return __awaiter(this, void 0, void 0, function* () {
        if (deleteId === null)
            return;
        yield fetch(API + deleteId, { method: "DELETE" });
        closeModal("deleteModal");
        loadBooks();
    });
}
// ----------------------------------------------------------------
// MODALS
// ----------------------------------------------------------------
function openModal(id) {
    document.getElementById(id).classList.add("active");
}
function closeModal(id) {
    document.getElementById(id).classList.remove("active");
}
// Export functions for HTML inline onclick
// @ts-ignore
window.openUpdate = openUpdate;
// @ts-ignore
window.openDelete = openDelete;
