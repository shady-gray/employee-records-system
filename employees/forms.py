from django import forms
from .models import Employee


class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = [
            "employee_id",
            "full_name",
            "department",
            "job_title",
            "email",
            "phone",
            "date_joined",
        ]
        widgets = {
            "employee_id": forms.TextInput(attrs={
                "placeholder": "e.g. EMP001",
                "aria-describedby": "employee-id-help",
                "aria-required": "true",
            }),
            "full_name": forms.TextInput(attrs={
                "placeholder": "Enter employee's full name",
                "aria-required": "true",
            }),
            "department": forms.TextInput(attrs={
                "placeholder": "e.g. Information Technology",
                "aria-required": "true",
            }),
            "job_title": forms.TextInput(attrs={
                "placeholder": "e.g. Software Developer",
                "aria-required": "true",
            }),
            "email": forms.EmailInput(attrs={
                "placeholder": "employee@example.com",
                "aria-required": "true",
            }),
            "phone": forms.TextInput(attrs={
                "placeholder": "e.g. 08012345678",
                "aria-required": "true",
            }),
            "date_joined": forms.DateInput(attrs={
                "type": "date",
                "aria-required": "true",
            }),
        }