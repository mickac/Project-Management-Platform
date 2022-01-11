from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

GEDNDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Not specified', 'Not specified'),
]


class Project(models.Model):
    title = models.CharField(max_length=50)
    details = models.CharField(max_length=500)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.IntegerField(default=2)
    added = models.DateTimeField(auto_now_add=True, blank=True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.TextField(max_length=15, choices=GEDNDER_CHOICES)
    birth_date = models.DateField(null=True, blank=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=14)


class Comments(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    project_id = models.OneToOneField(Project, on_delete=models.CASCADE, primary_key=False)
    content = models.CharField(max_length=500)
    added = models.DateTimeField(auto_now_add=True, blank=True)


class ProjectOwnership(models.Model):
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    project_id = models.OneToOneField(Project, on_delete=models.CASCADE, primary_key=False)
    is_owner = models.BooleanField()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()