from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField

GEDNDER_CHOICES = [
    ('Male', 'Female'),
    ('Not specified'),
]


class Project(models.Model):
    title = models.CharField(max_length=50)
    details = models.CharField(max_length=500)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=15)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.TextField(max_length=15, choices=GEDNDER_CHOICES)
    birth_date = models.DateField(null=True, blank=True)
    phone_number= models.CharField(max_length=15, required=False)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()