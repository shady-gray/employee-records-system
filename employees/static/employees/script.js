
console.log("Employee Records System loaded successfully.");

const STORAGE_KEY = "module4EmployeeRecords";

// Read client-side records safely.
function getClientEmployees() {
    try {
        const records = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(records) ? records : [];
    } catch (error) {
        console.error("Could not read employee records.", error);
        return [];
    }
}

// Save client-side records.
function saveClientEmployees(records) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        return true;
    } catch (error) {
        console.error("Could not save employee records.", error);
        return false;
    }
}

// Create a safe employee detail paragraph.
function createEmployeeDetail(label, value) {
    const paragraph = document.createElement("p");
    paragraph.className = "card-text";

    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;

    paragraph.appendChild(strong);
    paragraph.appendChild(document.createTextNode(value));

    return paragraph;
}

// Restore the empty-state message if there are no cards.
function updateEmptyState(employeeList) {
    const hasCards = employeeList.querySelector("article.card");
    let emptyState = document.getElementById("empty-employee-state");

    if (!hasCards && !emptyState) {
        emptyState = document.createElement("div");
        emptyState.id = "empty-employee-state";
        emptyState.className = "col-12";

        const message = document.createElement("div");
        message.className = "alert alert-info";
        message.textContent = "No employees have been registered yet.";

        emptyState.appendChild(message);
        employeeList.appendChild(emptyState);
    } else if (hasCards && emptyState) {
        emptyState.remove();
    }
}

// Create and append a client-side employee card.
function createEmployeeCard(employee, employeeList, onRemove) {
    const emptyState = document.getElementById("empty-employee-state");

    if (emptyState) {
        emptyState.remove();
    }

    const column = document.createElement("div");
    column.className = "col-md-6 col-lg-4";

    const card = document.createElement("article");
    card.className = "card h-100 shadow-sm";
    card.dataset.clientEmployeeId = employee.id;

    const body = document.createElement("div");
    body.className = "card-body";

    const heading = document.createElement("h3");
    heading.className = "card-title h5";
    heading.textContent = employee.fullName;

    const badge = document.createElement("span");
    badge.className = "badge text-bg-info mb-3";
    badge.textContent = "Browser-only record";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "btn btn-outline-danger mt-2";
    removeButton.textContent = "Remove Employee";

    removeButton.addEventListener("click", () => {
        onRemove(employee.id);
    });

    body.appendChild(heading);
    body.appendChild(badge);
    body.appendChild(createEmployeeDetail("Email", employee.email));
    body.appendChild(createEmployeeDetail("Department", employee.department));
    body.appendChild(createEmployeeDetail("Job Title", employee.jobTitle));
    body.appendChild(removeButton);

    card.appendChild(body);
    column.appendChild(card);
    employeeList.appendChild(column);
}

document.addEventListener("DOMContentLoaded", () => {

    // TASK 1: Existing System Information interaction.
    const systemInfo = document.getElementById("system-info");
    const infoButton = document.getElementById("info-button");

    if (systemInfo && infoButton) {
        infoButton.addEventListener("click", () => {
            const isVisible = systemInfo.classList.toggle("is-visible");

            infoButton.textContent = isVisible
                ? "Hide System Information"
                : "Show System Information";

            infoButton.setAttribute("aria-expanded", String(isVisible));
        });
    }

    // TASK 1: Employee list show/hide interaction.
    const employeeList = document.getElementById(
        "employee-list-container"
    );
    const toggleButton = document.getElementById(
        "employee-toggle-button"
    );
    const dashboardMessage = document.getElementById("dashboard-message");

    function updateDashboardMessage() {
        if (!employeeList || !dashboardMessage) return;

        const count = employeeList.querySelectorAll("article.card").length;

        dashboardMessage.textContent = employeeList.hidden
            ? "Employee list hidden. Select Show Employees to view the records."
            : `Displaying ${count} employee record${count === 1 ? "" : "s"}.`;
    }

    function removeClientEmployee(employeeId) {
        const remaining = getClientEmployees().filter(
            employee => employee.id !== employeeId
        );

        if (!saveClientEmployees(remaining)) {
            alert("Unable to update browser storage. Please check your browser settings.");
            return;
        }

        const card = employeeList.querySelector(
            `[data-client-employee-id="${employeeId}"]`
        );

        if (card) {
            const column = card.closest(".col-md-6");
            if (column) column.remove();
        }

        updateEmptyState(employeeList);
        updateDashboardMessage();
    }

    if (employeeList) {
        // Display previously added browser-only employees.
        getClientEmployees().forEach(employee => {
            createEmployeeCard(
                employee,
                employeeList,
                removeClientEmployee
            );
        });

        updateEmptyState(employeeList);
        updateDashboardMessage();
    }

    if (employeeList && toggleButton && dashboardMessage) {
        toggleButton.addEventListener("click", () => {
            const shouldShow = employeeList.hidden;

            employeeList.hidden = !shouldShow;
            toggleButton.textContent = shouldShow
                ? "Hide Employees"
                : "Show Employees";

            toggleButton.setAttribute("aria-expanded", String(shouldShow));
            updateDashboardMessage();
        });
    }

    // TASK 2 & 3: Validate and add employees from the dedicated form.
    const employeeForm = document.getElementById("dynamic-employee-form");

    if (!employeeForm) return;

    const fields = {
        fullName: document.getElementById("dynamic-employee-name"),
        email: document.getElementById("dynamic-employee-email"),
        department: document.getElementById("dynamic-employee-department"),
        jobTitle: document.getElementById("dynamic-employee-job-title")
    };

    const feedback = document.getElementById("employee-form-feedback");
    let submitAttempted = false;

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = `alert alert-${type}`;
        feedback.setAttribute("role", type === "danger" ? "alert" : "status");
    }

    function validateField(field, requiredMessage) {
        const errorElement = document.getElementById(`${field.id}-error`);
        const value = field.value.trim();
        let errorMessage = "";

        if (!value) {
            errorMessage = requiredMessage;
        } else if (
            field.type === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
            errorMessage = "Please enter a valid email address.";
        }

        field.classList.toggle("is-invalid", Boolean(errorMessage));
        field.setAttribute("aria-invalid", String(Boolean(errorMessage)));

        if (errorElement) {
            errorElement.textContent = errorMessage;
        }

        return !errorMessage;
    }

    function validateForm() {
        return [
            validateField(fields.fullName, "Please enter the employee's full name."),
            validateField(fields.email, "Please enter the employee's email address."),
            validateField(fields.department, "Please enter the employee's department."),
            validateField(fields.jobTitle, "Please enter the employee's job title.")
        ].every(Boolean);
    }

    function clearFieldErrors() {
        Object.values(fields).forEach(field => {
            field.classList.remove("is-invalid");
            field.setAttribute("aria-invalid", "false");

            const errorElement = document.getElementById(`${field.id}-error`);
            if (errorElement) errorElement.textContent = "";
        });
    }

    employeeForm.addEventListener("submit", event => {
        // Prevent a normal form submission and page reload.
        event.preventDefault();
        submitAttempted = true;

        if (!validateForm()) {
            showFeedback(
                "Please correct the highlighted fields before continuing.",
                "danger"
            );
            return;
        }

        const employeeData = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            fullName: fields.fullName.value.trim(),
            email: fields.email.value.trim(),
            department: fields.department.value.trim(),
            jobTitle: fields.jobTitle.value.trim()
        };

        const records = getClientEmployees();

        // Avoid duplicate email addresses among browser-only records.
        const duplicateEmail = records.some(
            employee => employee.email.toLowerCase() ===
                employeeData.email.toLowerCase()
        );

        if (duplicateEmail) {
            validateField(fields.email, "Please enter a different email address.");
            fields.email.classList.add("is-invalid");
            document.getElementById("dynamic-employee-email-error").textContent =
                "This email has already been added in this browser.";

            showFeedback(
                "An employee with that email already exists in the browser-only records.",
                "danger"
            );
            return;
        }

        records.push(employeeData);

        if (!saveClientEmployees(records)) {
            showFeedback(
                "The employee could not be saved in this browser. Check storage settings and try again.",
                "danger"
            );
            return;
        }

       // Clear every input explicitly after successful addition.
        employeeForm.reset();

        Object.values(fields).forEach((field) => {
            field.value = "";
        });

        clearFieldErrors();
        submitAttempted = false;

        showFeedback(
            "Employee added successfully in this browser. Return to Employee Records to view the new card.",
            "success"
        );

        console.log("Employee added to browser storage.", employeeData);
    });

    // Update errors as the user corrects the form.
    Object.values(fields).forEach(field => {
        field.addEventListener("input", () => {
            if (submitAttempted) {
                validateForm();
            }
        });
    });
});
