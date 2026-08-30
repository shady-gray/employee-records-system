from django.shortcuts import render
from .models import Employee

# Create your views here.
def home(request):
    context = {
        "company_name": "Global Telecommunication and Ventures Ltd.",
        "total_employees": Employee.objects.count(),
    }
    return render(request, "employees/home.html", context)

def employee_list(request):
    employees = Employee.objects.all()
    context = {
        "employees": employees,
        "page_title": "Employee Records",
        "company_name": "Global Telecommunication and Ventures Ltd.",
    }
    return render(request, "employees/employee_list.html", context)

def employee_detail(request, employee_id):
    employee = Employee.objects.get(id=employee_id)
    context = {
        "employee": employee,
        "company_name": "Global Telecommunication and Ventures Ltd.",
        "page_title": f"Employee Details - {employee.full_name}",
    }
    return render(request, "employees/employee_detail.html", context)