from django.contrib import admin

# Register your models here.
from .models import AadharDetails, PanDetails


class AadharAdmin(admin.ModelAdmin):
    list_display = ["__str__", "aadhar_number", "name"]

    class Meta:
        model = AadharDetails


admin.site.register(AadharDetails, AadharAdmin)


class PanAdmin(admin.ModelAdmin):
    list_display = ["__str__", "pan_number", "name"]

    class Meta:
        model = PanDetails


admin.site.register(PanDetails, PanAdmin)

