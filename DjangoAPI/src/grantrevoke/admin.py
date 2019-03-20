from django.contrib import admin
from .models import Organisation, RequestingOrganisation, Temp

# Register your models here.


class OrganisationAdmin(admin.ModelAdmin):
    list_display = ["__str__", "key"]

    class Meta:
        model = Organisation


admin.site.register(Organisation, OrganisationAdmin)


class RequestingOrganisationAdmin(admin.ModelAdmin):
    list_display = ["__str__", "attributes", "user"]

    class Meta:
        model = RequestingOrganisation


admin.site.register(RequestingOrganisation, RequestingOrganisationAdmin)
admin.site.register(Temp)

