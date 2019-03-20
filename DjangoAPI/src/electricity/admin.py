from django.contrib import admin
from .models import ElectricityBill

# Register your models here.
class ElectricityBillAdmin(admin.ModelAdmin):
    list_display = ["__str__", "consumerId", "name"]

    class Meta:
        model = ElectricityBill


admin.site.register(ElectricityBill, ElectricityBillAdmin)
