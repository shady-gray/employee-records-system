from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "employee_id",
        "full_name",
        "email",
        "department",
        "job_title",
        "date_joined",
        "date_created",
    )

    search_fields = (
        "employee_id",
        "full_name",
        "email",
        "department",
        "job_title",
    )

    list_filter = (
        "department",
        "date_joined",
    )