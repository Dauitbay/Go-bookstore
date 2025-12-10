document.addEventListener("DOMContentLoaded", () => {
    loadFragment("header.html", "header");
    loadFragment("footer.html", "footer");
});

function loadFragment(file, targetId) {
    fetch("/" + file)
        .then(res => res.text())
        .then(html => {
            document.getElementById(targetId).innerHTML = html;

            if (file === "header.html") {
                initProfileMenu();
                initAuthButtons();
            }
        });
}

/* ============================================================
   PROFILE MENU DROPDOWN
============================================================ */
function initProfileMenu() {
    const btn = document.getElementById("profileBtn");
    const menu = document.getElementById("profileMenu");

    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
}

/* ============================================================
   LOGOUT + LOGOUT ALL HANDLERS
============================================================ */
function initAuthButtons() {
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutAllBtn = document.getElementById("logoutAllBtn");

    // Wait until auth.js loads
    if (typeof logout !== "function") {
        setTimeout(initAuthButtons, 100);
        return;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logout();
        });
    }

    if (logoutAllBtn) {
        logoutAllBtn.addEventListener("click", async () => {
            try {
                await authFetch(API + "/auth/logout-all", { method: "POST" });
            } catch (e) {
                console.warn("Logout-All failed but continuing:", e);
            }
            logout();
        });
    }
}
