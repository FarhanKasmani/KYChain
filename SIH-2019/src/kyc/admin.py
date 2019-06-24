from django.contrib import admin
from .models import KYCStatus
# Register your models here.

class KYCAdmin(admin.ModelAdmin):
    list_display = ["__str__", "status"]

    class Meta:
        model = KYCStatus

admin.site.register(KYCStatus, KYCAdmin)