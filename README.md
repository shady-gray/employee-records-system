# Employee Records Management System

A Django-based Employee Records Management System developed incrementally through Modules 1–4. The project combines Django's Model–View–Template (MVT) structure with semantic HTML, responsive CSS, accessible forms, and JavaScript interactions in the browser.

## Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [Application Routes](#application-routes)
- [How the Application Works](#how-the-application-works)
- [Module 4 JavaScript Behaviour](#module-4-javascript-behaviour)
- [Testing and Verification](#testing-and-verification)
- [Database and Browser Storage](#database-and-browser-storage)
- [Troubleshooting](#troubleshooting)
- [Git Workflow](#git-workflow)
- [Future Improvements](#future-improvements)

## Project Overview

The application provides a web interface for viewing employee records and inspecting individual employee details. The Django backend supplies the existing database-backed employee records. The user interface uses reusable Django templates, an external CSS stylesheet, and an external JavaScript file for client-side interactions.

The project was extended in Module 3 to improve semantic structure, accessibility, layout, and responsiveness. Module 4 adds client-side DOM manipulation, employee-list visibility controls, form validation, and browser-only employee entries.

> **Important:** Employee entries created by the Module 4 JavaScript form are stored in the current browser's `localStorage`. They are not submitted to or saved in Django's database. Existing Django employee records remain database-backed.

## Features

### Django application

- Home page showing a summary of the system and employee count.
- Employee list page displaying records retrieved from the database.
- Employee detail page for an individual database-backed record.
- A dedicated employee form page at `/employees/add/`.
- Django URL namespacing through the `employees` application namespace.

### Interface and accessibility

- Semantic HTML5 structure, including header, navigation, main content, sections, and footer.
- Shared page layout using Django template inheritance.
- External CSS for typography, navigation, cards, forms, buttons, and responsive layouts.
- CSS Grid and Flexbox for layout and alignment.
- Visible keyboard-focus styles and labels associated with form inputs.
- ARIA attributes and live feedback areas to improve the experience for assistive-technology users.
- Responsive layout rules for desktop, tablet, and mobile screen sizes.

### JavaScript dashboard

- Employee-list show/hide control without reloading the page.
- Dynamic dashboard status messages.
- Client-side validation for full name, email, department, and job title.
- Inline validation messages and success/error feedback.
- Dynamically generated employee cards using DOM methods.
- Remove buttons for browser-only employee entries.
- `localStorage` persistence for Module 4 entries in the same browser.

## Technology Stack

- **Python** — application language.
- **Django 6.0.7** — web framework used by the project environment.
- **SQLite** — default local database, unless the project settings have been changed.
- **HTML5 and Django Template Language** — page structure and template rendering.
- **CSS3** — styling, Grid, Flexbox, focus states, and media queries.
- **Bootstrap 5.3.8** — layout and utility classes loaded through the Bootstrap CDN.
- **JavaScript** — DOM manipulation, event handling, validation, and browser-only records.

## Project Structure

The principal files and folders are organised as follows. If your local repository contains additional files, retain them; this tree highlights the main application components.

```text
employee_record_system/
├── manage.py
├── requirements.txt
├── employee_record_system/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
└── employees/
    ├── migrations/
    ├── models.py
    ├── forms.py
    ├── views.py
    ├── urls.py
    ├── templates/
    │   └── employees/
    │       ├── base.html
    │       ├── home.html
    │       ├── employee_list.html
    │       ├── employee_detail.html
    │       └── employee_form.html
    └── static/
        └── employees/
            ├── style.css
            └── script.js
```

### Main file responsibilities

| File | Responsibility |
|---|---|
| `manage.py` | Django management commands. |
| `employee_record_system/settings.py` | Project settings, installed applications, templates, static files, and database configuration. |
| `employee_record_system/urls.py` | Root URL routing. |
| `employees/models.py` | Defines the `Employee` database model. |
| `employees/forms.py` | Defines the Django `EmployeeForm` where used by backend form workflows. |
| `employees/views.py` | Renders the home, list, detail, and add-employee pages. |
| `employees/urls.py` | Maps employee-related routes to views. |
| `base.html` | Shared page layout, navigation, stylesheet links, and JavaScript inclusion. |
| `home.html` | Home page content. |
| `employee_list.html` | Database-backed employee list and JavaScript dashboard controls. |
| `employee_detail.html` | Details for a selected database-backed employee. |
| `employee_form.html` | Dedicated client-side employee form. |
| `style.css` | Shared styling and responsive layout rules. |
| `script.js` | Client-side interactions, validation, dynamic card creation, and browser storage. |

## Requirements

- Python compatible with the project's installed Django version (the current development environment used Python 3.14.x).
- `pip` for installing Python dependencies.
- A web browser with JavaScript enabled.
- Internet access when loading Bootstrap from its CDN.
- Git for version control and GitHub submission.

Install dependencies from the project's `requirements.txt`. The current project requirements include Django 6.0.7 and its listed dependencies; use the repository file as the source of truth for exact versions.

## Installation and Setup

Run these commands from the repository root—the directory containing `manage.py`.

### 1. Create a virtual environment

Linux, macOS, or WSL:

```bash
python3 -m venv django_env
source django_env/bin/activate
```

Windows PowerShell:

```powershell
py -m venv django_env
.\django_env\Scripts\Activate.ps1
```

**Purpose:** A virtual environment isolates this project's Python packages from other Python projects on the computer.

### 2. Install dependencies

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

**Purpose:** These commands install the packages specified by the repository.

### 3. Apply database migrations

```bash
python manage.py migrate
```

**Purpose:** Django creates or updates the local database tables required by the project's migrations.

If you modify the `Employee` model, create and apply a migration as appropriate:

```bash
python manage.py makemigrations employees
python manage.py migrate
```

### 4. Check the project configuration

```bash
python manage.py check
```

**Purpose:** Django checks the project for common configuration errors.

## Running the Application

Start the development server from the repository root:

```bash
python manage.py runserver
```

Open the local development address in a browser:

- Home: <http://127.0.0.1:8000/>
- Employee list: <http://127.0.0.1:8000/employees/>
- Add employee form: <http://127.0.0.1:8000/employees/add/>

Press `Ctrl+C` in the terminal to stop the development server.

## Application Routes

| Route | Purpose |
|---|---|
| `/` | Home page and employee summary. |
| `/employees/` | Displays existing database-backed employee records and browser-only entries stored by Module 4 JavaScript. |
| `/employees/add/` | Displays the dedicated client-side employee form. |
| `/employees/<id>/` | Displays details for an existing database-backed employee record. |

The application uses the `employees` URL namespace. Template links should use named routes such as `{% url 'employees:employee_list' %}` rather than hard-coded paths where possible.

## How the Application Works

The project follows Django's Model–View–Template (MVT) architecture:

1. **Model:** `employees/models.py` defines the `Employee` data model.
2. **View:** functions in `employees/views.py` handle requests and prepare data for templates.
3. **Template:** Django templates render the response sent to the browser.
4. **Static assets:** `style.css` and `script.js` provide presentation and client-side behavior.

### Employee model fields

The current `Employee` model contains:

- `employee_id` — unique employee identifier.
- `full_name` — employee's full name.
- `department` — department name.
- `job_title` — job title.
- `email` — unique email address.
- `phone` — contact number.
- `date_joined` — date the employee joined.

Database-backed records are retrieved through Django views and rendered in templates. The Module 4 form uses a separate client-side workflow for demonstrating JavaScript validation and DOM updates.

## Module 4 JavaScript Behaviour

The external JavaScript file is included by `base.html` using Django's static-file tag. The expected path is:

```html
<script src="{% static 'employees/script.js' %}"></script>
```

The file should therefore be located at `employees/static/employees/script.js`.

### Employee list interaction

On `/employees/`, JavaScript selects the employee list, its show/hide button, and the dashboard message. An event listener toggles the list's visibility, updates the button label and `aria-expanded` attribute, and refreshes the status message without a full page reload.

### Client-side form validation

On `/employees/add/`, JavaScript handles the form's submit event and calls `preventDefault()` so the browser does not perform a normal form submission. It validates the four required fields and checks that the email has a reasonable format. Field-level messages and overall feedback are updated through DOM manipulation.

### Dynamic employee cards

After valid input is accepted, JavaScript creates a browser-only employee record and stores it in `localStorage` under the key:

```text
module4EmployeeRecords
```

When the employee list page opens, the script reads those records and builds employee cards with DOM methods. Each browser-only card has a Remove Employee button. Removal updates the browser storage and the displayed list.

Employee-provided values are placed into DOM text nodes or `textContent` rather than inserted as raw HTML. This helps avoid treating user-entered text as markup.

## Testing and Verification

Use the following checklist when reviewing the project locally.

### Django checks

```bash
python manage.py check
python manage.py test
```

`manage.py test` runs the project's Django test suite if tests have been written. Manual browser testing is also necessary for client-side interactions.

### Manual browser checks

1. Open the home page and confirm it renders.
2. Open the employee list and confirm database-backed employees display correctly.
3. Use **Hide Employees** and **Show Employees** and confirm that the list and status message update without a reload.
4. Open the dedicated Add Employee page.
5. Submit the form empty and confirm that required-field errors appear.
6. Enter an invalid email and confirm that validation rejects it.
7. Enter valid data, submit, and confirm that the success message appears and the form clears.
8. Return to the employee list and confirm that the browser-only employee card appears.
9. Add more than one browser-only record and remove one of them.
10. Refresh the list and confirm the remaining browser-only records persist in that browser.
11. Use browser DevTools to check the Console for JavaScript errors and the Elements panel for dynamically generated cards.
12. Test desktop, tablet, and mobile widths to confirm the responsive layout remains usable.

### Clearing Module 4 test records

To remove only the browser-only records for this project, open the browser DevTools Console on the application origin and run:

```javascript
localStorage.removeItem("module4EmployeeRecords");
location.reload();
```

This clears the Module 4 browser storage key for the current site origin. It does not delete employee records from Django's database.

## Database and Browser Storage

The application currently has two distinct record sources:

| Record source | Storage | Persistence and visibility |
|---|---|---|
| Existing employee records | Django database | Available through the backend and shared by users of that database, subject to deployment and access configuration. |
| Employees added through the Module 4 JavaScript form | Browser `localStorage` | Persists in that browser and origin; not shared with other users or devices and not written to Django's database. |

The Module 4 client-side form is a learning feature for practicing DOM manipulation, event handling, and validation. Client-side checks can be bypassed, so they must not be considered a substitute for backend validation. Browser storage is also not appropriate for confidential HR data in a production employee management system.

## Troubleshooting

### CSS or JavaScript changes do not appear

The browser may be using cached static files. Perform a hard refresh with `Ctrl+Shift+R` (or `Ctrl+F5` on browsers that support it), then inspect the Network and Console panels if necessary.

### `NoReverseMatch` for `employee_create`

Confirm that `employees/urls.py` includes a route named `employee_create` and that `employees/views.py` contains the corresponding `employee_create` view. The template URL name must exactly match the registered route name.

### JavaScript does not run

- Confirm that the actual filename is `script.js`, not `scripts.js`.
- Confirm the file is under `employees/static/employees/`.
- Confirm `base.html` references `{% static 'employees/script.js' %}`.
- Hard-refresh the page and check DevTools Console for syntax errors.

### Browser-only employees do not appear

- Confirm that local storage is enabled for the current site origin.
- Check the Console for storage errors.
- Confirm the page is using the same host and port. `localhost:8000` and `127.0.0.1:8000` have separate browser storage origins.
- Confirm that `script.js` is loaded on both the form and employee list pages.

### Database-backed employee details do not open

Confirm that the employee ID in the details link is a valid database primary key and that the employee-detail URL and view are registered correctly.

## Git Workflow

Check the working tree before committing:

```bash
git status
```

Stage and commit the Module 4 changes:

```bash
git add employees README.md screenshots
git commit -m "Add dynamic employee dashboard"
```

If your screenshots folder has a different name, stage the folder that contains the required evidence instead. Avoid committing virtual environments, local secrets, or generated database files unless the coursework specifically requires them.

Push the current branch to the configured GitHub remote:

```bash
git push origin HEAD
```

Verify the commit and working-tree status after pushing:

```bash
git log -1 --oneline
git status
```

The repository's previously used GitHub remote was `https://github.com/shady-gray/employee-records-system.git`. Confirm the actual remote configured in your local repository with `git remote -v` before pushing.

## Future Improvements

Potential next steps include:

- Submit the employee form to a Django view and save records to the database.
- Add backend validation, duplicate-email handling, authentication, and role-based access control.
- Use automated Django tests and JavaScript tests for critical behavior.
- Add pagination and search to the employee list.
- Replace browser-only storage with a backend API when the coursework introduces that architecture.
- Configure production static-file serving and deployment settings.

---

**Project:** Employee Records Management System  
**Framework:** Django 6.0.7  
**Current focus:** Semantic and responsive interface, accessibility, and JavaScript-powered client-side interactions.
