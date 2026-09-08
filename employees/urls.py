from django.urls import path
from . import views

app_name = "employees"

urlpatterns = [
    path("", views.home, name="home"),
    path("employees/", views.employee_list, name="employee_list"),
    path("employees/add/", views.employee_create, name="employee_create"),
    path("employees/<int:employee_id>/", views.employee_detail, name="employee_detail"),

]