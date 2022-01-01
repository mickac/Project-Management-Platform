from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=50)
    details = models.CharField(max_length=500)
    startDate = models.DateField()
    endDate = models.DateField()
    status = models.CharField(max_length=15)