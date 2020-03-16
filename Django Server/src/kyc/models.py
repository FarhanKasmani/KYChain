from django.db import models
from django.conf import settings
from django.db.models.signals import pre_save, post_save

User = settings.AUTH_USER_MODEL

# Create your models here.


class KYCStatus(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    uid = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.user.email


def user_post_save_reciever(sender, instance, *args, **kwargs):
    obj = KYCStatus.objects.create(
        user = instance,
        uid= '',
        status = False
    )
post_save.connect(user_post_save_reciever, sender=User)
