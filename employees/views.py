from django.contrib import messages
from django.shortcuts import render, redirect, get_object_or_404

from .models import Employee
from .forms import EmployeeForm


def home(request):
    context = {
        "company_name": "Global Telecommunication and Ventures Ltd.",
        "total_employees": Employee.objects.count(),
    }

    return render(request, "employees/home.html", context)


def employee_list(request):
    employees = Employee.objects.all().order_by("-date_created")

    context = {
        "employees": employees,
        "page_title": "Employee Records",
        "company_name": "Global Telecommunication and Ventures Ltd.",
    }

    return render(request, "employees/employee_list.html", context)


def employee_detail(request, employee_id):
    employee = get_object_or_404(Employee, id=employee_id)

    context = {
        "employee": employee,
        "company_name": "Global Telecommunication and Ventures Ltd.",
        "page_title": f"Employee Details - {employee.full_name}",
    }

    return render(request, "employees/employee_detail.html", context)


def employee_create(request):
    if request.method == "POST":
        form = EmployeeForm(request.POST)

        if form.is_valid():
            employee = form.save()

            messages.success(
                request,
                f"{employee.full_name} was added successfully.",
            )

            return redirect("employees:employee_list")

    else:
        form = EmployeeForm()

    context = {
        "form": form,
        "company_name": "Global Telecommunication and Ventures Ltd.",
        "page_title": "Add Employee",
    }

    return render(
        request,
        "employees/employee_form.html",
        context,
    )