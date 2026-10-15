from django import forms
from .models import Employee


class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee

        fields = [
            "employee_id",
            "full_name",
            "email",
            "department",
            "job_title",
            "phone",
            "date_joined",
        ]

        labels = {
            "employee_id": "Employee ID",
            "full_name": "Full Name",
            "email": "Email Address",
            "department": "Department",
            "job_title": "Job Title",
            "phone": "Phone Number",
            "date_joined": "Date Joined",
        }

        widgets = {
            "employee_id": forms.TextInput(attrs={
                "class": "form-input",
                "placeholder": "e.g. EMP004",
                "aria-describedby": "employee-id-error",
            }),
            "full_name": forms.TextInput(attrs={
                "class": "form-input",
                "placeholder": "Enter full name",
                "autocomplete": "name",
                "aria-describedby": "full-name-error",
            }),
            "email": forms.EmailInput(attrs={
                "class": "form-input",
                "placeholder": "name@example.com",
                "autocomplete": "email",
                "aria-describedby": "email-error",
            }),
            "department": forms.TextInput(attrs={
                "class": "form-input",
                "placeholder": "e.g. Information Technology",
                "aria-describedby": "department-error",
            }),
            "job_title": forms.TextInput(attrs={
                "class": "form-input",
                "placeholder": "e.g. Software Developer",
                "aria-describedby": "job-title-error",
            }),
            "phone": forms.TextInput(attrs={
                "class": "form-input",
                "placeholder": "Enter phone number",
                "autocomplete": "tel",
                "aria-describedby": "phone-error",
            }),
            "date_joined": forms.DateInput(
                format="%Y-%m-%d",
                attrs={
                    "class": "form-input",
                    "type": "date",
                    "aria-describedby": "date-joined-error",
                },
            ),
        }