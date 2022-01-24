from typing_extensions import Required
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

from project_management_system.managers import CustomUserManager

GEDNDER_CHOICES = [
    ("Male", "Male"),
    ("Female", "Female"),
    ("Unknown", "Unknown"),
]


class Project(models.Model):
    alphanumeric_regex = RegexValidator(
        regex="^[a-zA-Z0-9 ]*$",
        message="""This field can contain only
                alphanumberical characters.""",
    )
    title = models.CharField(max_length=50, validators=[alphanumeric_regex])
    details = models.CharField(max_length=500, validators=[alphanumeric_regex])
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.IntegerField(default=2)
    added = models.DateTimeField(auto_now_add=True, blank=True)


class User(AbstractUser):
    phone_regex = RegexValidator(
        regex="^\ ?1?\d{9,15}$",
        message="""Phone number must be entered in the format: 
                        ' 999999999'. 9-15 digits allowed.""",
    )
    name_regex = RegexValidator(
        regex="^[a-zA-Z ,.'-]+$",
        message="""Not valid format for name.""",
    )    
    username = None
    first_name = models.CharField(validators=[name_regex], max_length=15)
    last_name = models.CharField(validators=[name_regex], max_length=15)
    email = models.EmailField(
        _("email address"),
        unique=True,
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    gender = models.TextField(max_length=15, choices=GEDNDER_CHOICES)
    birth_date = models.DateField()
    projects = models.ManyToManyField(Project, through="ProjectOwnership")
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Comments(models.Model):
    alphanumeric_regex = RegexValidator(
        regex="^[a-zA-Z0-9 ]*$",
        message="""This field can contain only
                alphanumberical characters.""",
    )
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    content = models.CharField(max_length=500, validators=[alphanumeric_regex])
    added = models.DateTimeField(auto_now_add=True, blank=True)


class ProjectOwnership(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    is_owner = models.BooleanField()
