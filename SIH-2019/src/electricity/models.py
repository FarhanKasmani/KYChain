from django.db import models

# Create your models here.
class ElectricityBill(models.Model):
    consumerId = models.CharField(max_length=7)
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=120)

    def __str__(self):
        return self.name
