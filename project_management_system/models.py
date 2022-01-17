from typing_extensions import Required
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

from project_management_system.managers import CustomUserManager

GEDNDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Unknown', 'Unknown'),
]

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. 9-15 digits allowed.",
    )
    phone_number = models.CharField(
        validators=[phone_regex],
        max_length=17,
        blank=True
    )
    gender = models.TextField(max_length=15, choices=GEDNDER_CHOICES)
    birth_date = models.DateField()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Project(models.Model):
    title = models.CharField(max_length=50)
    details = models.CharField(max_length=500)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.IntegerField(default=2)
    added = models.DateTimeField(auto_now_add=True, blank=True)


class Comments(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    added = models.DateTimeField(auto_now_add=True, blank=True)


class ProjectOwnership(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    is_owner = models.BooleanField()