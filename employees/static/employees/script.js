document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navList = document.querySelector(".nav-list");

    if (!navToggle || !navList) {
        return;
    }

    navToggle.addEventListener("click", function () {
        const isOpen = navList.classList.toggle("nav-open");

        navToggle.setAttribute("aria-expanded", isOpen);
    });
});