from django.db import models
import random, os
from django.conf import settings

User = settings.AUTH_USER_MODEL

# Create your models here.
def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext


def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3442524535)
    name, ext = get_filename_ext(filename)
    final_filename = "{new_filename}{ext}".format(new_filename=new_filename, ext=ext)
    return "aadhar/{new_filename}/{final_filename}".format(
        new_filename=new_filename, final_filename=final_filename
    )


class AadharDetails(models.Model):
    aadhar_number = models.CharField(max_length=12)
    name = models.CharField(max_length=120)
    gender = models.CharField(max_length=120)
    dob = models.DateField()
    address = models.CharField(max_length=240)
    phone = models.DecimalField(max_digits=10, decimal_places=0)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    def __str__(self):
        return self.name


class PanDetails(models.Model):
    pan_number = models.CharField(max_length=10)
    name = models.CharField(max_length=120)
    gender = models.CharField(max_length=120)
    dob = models.DateField()
    phone = models.DecimalField(max_digits=10, decimal_places=0)
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    def __str__(self):
        return self.name
