from django.db import models
from django.conf import settings
from grantrevoke.models import Organisation
from kyc.models import KYCStatus


User = settings.AUTH_USER_MODEL

# Create your models here.


class UserIssues(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    organistaion = models.ForeignKey(
        Organisation,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        name="organisation",
    )
    user_query = models.CharField(max_length=100)
    kycStatus = models.ForeignKey(
        KYCStatus, null=True, blank=True, on_delete=models.CASCADE
    )

    def __str__(self):
        return self.user.email
