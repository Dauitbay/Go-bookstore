const API = "http://localhost:9010/book/";

interface Book {
    ID?: number;
    name: string;
    author: string;
    publication: string;
}

let updateId: number | null = null;
let deleteId: number | null = null;

document.addEventListener("DOMContentLoaded", () => {
    loadBooks();

    // Buttons from header or page
    document.getElementById("openCreateModal")!.onclick = () =>
        openModal("createModal");

    // Close modal buttons
    document.getElementById("closeCreateModal")!.onclick = () =>
        closeModal("createModal");

    document.getElementById("closeUpdateModal")!.onclick = () =>
        closeModal("updateModal");

    document.getElementById("closeDeleteModal")!.onclick = () =>
        closeModal("deleteModal");

    // Forms
    document.getElementById("createForm")!.addEventListener("submit", createBook);
    document.getElementById("updateForm")!.addEventListener("submit", updateBookSubmit);

    // Delete confirm
    document.getElementById("confirmDelete")!.onclick = confirmDelete;
});


// ----------------------------------------------------------------
// LOAD ALL BOOKS
// ----------------------------------------------------------------
async function loadBooks() {
    const res = await fetch(API);
    const books: Book[] = await res.json();

    const tbody = document.getElementById("books-body")!;
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
}


// Escape quotes inside strings to avoid breaking HTML
function escapeStr(str: string): string {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}


// ----------------------------------------------------------------
// CREATE BOOK
// ----------------------------------------------------------------
async function createBook(e: Event) {
    e.preventDefault();

    const name = (document.getElementById("createName") as HTMLInputElement).value;
    const author = (document.getElementById("createAuthor") as HTMLInputElement).value;
    const publication = (document.getElementById("createPublication") as HTMLInputElement).value;

    await fetch(API, {
        method: "POST",
        body: JSON.stringify({ name, author, publication }),
        headers: { "Content-Type": "application/json" }
    });

    closeModal("createModal");
    loadBooks();
}


// ----------------------------------------------------------------
// UPDATE BOOK (open form)
// ----------------------------------------------------------------
function openUpdate(id: number, name: string, author: string, publication: string) {
    updateId = id;

    (document.getElementById("updateName") as HTMLInputElement).value = name;
    (document.getElementById("updateAuthor") as HTMLInputElement).value = author;
    (document.getElementById("updatePublication") as HTMLInputElement).value = publication;

    openModal("updateModal");
}


// ----------------------------------------------------------------
// UPDATE BOOK (submit)
// ----------------------------------------------------------------
async function updateBookSubmit(e: Event) {
    e.preventDefault();

    if (updateId === null) return;

    const name = (document.getElementById("updateName") as HTMLInputElement).value;
    const author = (document.getElementById("updateAuthor") as HTMLInputElement).value;
    const publication = (document.getElementById("updatePublication") as HTMLInputElement).value;

    await fetch(API + updateId, {
        method: "PUT",
        body: JSON.stringify({ name, author, publication }),
        headers: { "Content-Type": "application/json" }
    });

    closeModal("updateModal");
    loadBooks();
}


// ----------------------------------------------------------------
// DELETE BOOK
// ----------------------------------------------------------------
function openDelete(id: number) {
    deleteId = id;
    openModal("deleteModal");
}

async function confirmDelete() {
    if (deleteId === null) return;

    await fetch(API + deleteId, { method: "DELETE" });

    closeModal("deleteModal");
    loadBooks();
}


// ----------------------------------------------------------------
// MODALS
// ----------------------------------------------------------------
function openModal(id: string) {
    document.getElementById(id)!.classList.add("active");
}

function closeModal(id: string) {
    document.getElementById(id)!.classList.remove("active");
}


// Export functions for HTML inline onclick
// @ts-ignore
window.openUpdate = openUpdate;
// @ts-ignore
window.openDelete = openDelete;
