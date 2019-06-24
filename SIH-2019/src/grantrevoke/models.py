from django.db import models
from django.conf import settings
from multiselectfield import MultiSelectField

User = settings.AUTH_USER_MODEL

# Create your models here.

MY_CHOICES = (
    ("name", "name"),
    ("dob", "dob"),
    ("phone", "phone"),
    ("address", "address"),
    ("gender", "gender")
)


class Organisation(models.Model):
    key = models.CharField(max_length=10)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class RequestingOrganisation(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    organistaion = models.ForeignKey(
        Organisation,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        name="organisation",
    )
    attributes = MultiSelectField(choices=MY_CHOICES)

    def __str__(self):
        return self.organisation.name


class Temp(models.Model):
    attributes = MultiSelectField(choices=MY_CHOICES)

