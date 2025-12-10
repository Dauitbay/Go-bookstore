"use strict";

const API = "http://localhost:9010/books"; // FIXED base path

let updateId = null;
let deleteId = null;

document.addEventListener("DOMContentLoaded", () => {
    loadBooks();

    // Open create modal
    document.getElementById("openCreateModal").onclick = () =>
        openModal("createModal");

    // Close modals
    document.getElementById("closeCreateModal").onclick = () =>
        closeModal("createModal");

    document.getElementById("closeUpdateModal").onclick = () =>
        closeModal("updateModal");

    document.getElementById("closeDeleteModal").onclick = () =>
        closeModal("deleteModal");

    // Form submissions
    document.getElementById("createForm").addEventListener("submit", createBook);
    document.getElementById("updateForm").addEventListener("submit", updateBookSubmit);

    // Delete confirmation
    document.getElementById("confirmDelete").onclick = confirmDelete;
});

// =============================================================
// LOAD BOOKS
// =============================================================
async function loadBooks() {
    try {
        const res = await authFetch(API);
        const books = await res.json();

        const tbody = document.getElementById("books-body");
        tbody.innerHTML = "";

        books.forEach((b) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="p-2">${b.ID}</td>
                <td class="p-2">${escapeHTML(b.name)}</td>
                <td class="p-2">${escapeHTML(b.author)}</td>
                <td class="p-2">${escapeHTML(b.publication)}</td>
                <td class="p-2 space-x-3">
                    <button class="text-blue-600 hover:text-blue-800"
                        onclick="openUpdate(${b.ID}, '${escapeAttr(b.name)}', '${escapeAttr(b.author)}', '${escapeAttr(b.publication)}')">
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
    } catch (e) {
        console.error("Load books failed:", e);
    }
}

// =============================================================
// Escape Helpers
// =============================================================
function escapeHTML(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeAttr(str = "") {
    return String(str)
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"');
}

// =============================================================
// CREATE BOOK
// =============================================================
async function createBook(e) {
    e.preventDefault();

    const name = document.getElementById("createName").value;
    const author = document.getElementById("createAuthor").value;
    const publication = document.getElementById("createPublication").value;

    await authFetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, author, publication }),
    });

    closeModal("createModal");
    loadBooks();
}

// =============================================================
// UPDATE BOOK
// =============================================================
function openUpdate(id, name, author, publication) {
    updateId = id;

    document.getElementById("updateName").value = name;
    document.getElementById("updateAuthor").value = author;
    document.getElementById("updatePublication").value = publication;

    openModal("updateModal");
}

async function updateBookSubmit(e) {
    e.preventDefault();
    if (updateId === null) return;

    const name = document.getElementById("updateName").value;
    const author = document.getElementById("updateAuthor").value;
    const publication = document.getElementById("updatePublication").value;

    await authFetch(`${API}/${updateId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, author, publication }),
    });

    closeModal("updateModal");
    loadBooks();
}

// =============================================================
// DELETE BOOK
// =============================================================
function openDelete(id) {
    deleteId = id;
    openModal("deleteModal");
}

async function confirmDelete() {
    if (deleteId === null) return;

    await authFetch(`${API}/${deleteId}`, { method: "DELETE" });

    closeModal("deleteModal");
    loadBooks();
}

// =============================================================
// MODALS
// =============================================================
function openModal(id) {
    document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
}

// =============================================================
// HEADER DROPDOWN
// =============================================================
function initProfileMenu() {
    const btn = document.getElementById("profileBtn");
    const menu = document.getElementById("profileMenu");

    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
}

window.initProfileMenu = initProfileMenu;

// Exports for inline onclick
window.openUpdate = openUpdate;
window.openDelete = openDelete;
