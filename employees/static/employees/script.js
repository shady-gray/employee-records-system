console.log("Employee Records System loaded successfully.");

document.addEventListener("DOMContentLoaded", () => {

    // Preserve the System Information interaction if present.
    const systemInfo = document.getElementById("system-info");
    const infoButton = document.getElementById("info-button");

    if (systemInfo && infoButton) {
        infoButton.addEventListener("click", () => {
            const isVisible =
                systemInfo.classList.toggle("is-visible");

            infoButton.textContent = isVisible
                ? "Hide System Information"
                : "Show System Information";

            infoButton.setAttribute(
                "aria-expanded",
                String(isVisible)
            );
        });
    }

    // Preserve the employee list show/hide interaction.
    const employeeList = document.getElementById(
        "employee-list-container"
    );

    const toggleButton = document.getElementById(
        "employee-toggle-button"
    );

    const dashboardMessage = document.getElementById(
        "dashboard-message"
    );

    if (!employeeList || !toggleButton || !dashboardMessage) {
        return;
    }

    function updateDashboardMessage() {
        const employeeCount =
            employeeList.querySelectorAll("article.card").length;

        dashboardMessage.textContent = employeeList.hidden
            ? "Employee list hidden. Select Show Employees to view the records."
            : `Displaying ${employeeCount} employee record${employeeCount === 1 ? "" : "s"}.`;
    }

    toggleButton.addEventListener("click", () => {
        const shouldShow = employeeList.hidden;

        employeeList.hidden = !shouldShow;

        toggleButton.textContent = shouldShow
            ? "Hide Employees"
            : "Show Employees";

        toggleButton.setAttribute(
            "aria-expanded",
            String(shouldShow)
        );

        updateDashboardMessage();
    });

    updateDashboardMessage();
});