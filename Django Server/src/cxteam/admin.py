from django.contrib import admin
from .models import UserIssues

# Register your models here.


class UserIssuesAdmin(admin.ModelAdmin):
    list_display = ["__str__"]

    class Meta:
        model = UserIssues


admin.site.register(UserIssues, UserIssuesAdmin)
