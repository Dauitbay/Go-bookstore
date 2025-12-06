async function loadFragment(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

// Load header and footer
loadFragment("header", "header.html");
loadFragment("footer", "footer.html");
