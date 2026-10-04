console.log("Employee Records System loaded successfully.");

document.addEventListener("DOMContentLoaded", () => {
    const systemInfo = document.getElementById("system-info");
    const button = document.getElementById("info-button");

    if (!systemInfo || !button) {
        return;
    }

    button.addEventListener("click", () => {
        const isVisible = systemInfo.classList.toggle("is-visible");

        button.textContent = isVisible
            ? "Hide System Information"
            : "Show System Information";

        button.setAttribute("aria-expanded", String(isVisible));
    });
});