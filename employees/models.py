from django.db import models

# Create your models here.
class Employee(models.Model):
    employee_id = models.CharField(max_length=20, unique=True)
    full_name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    date_joined = models.DateField()

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"