from django.conf import settings
from django.contrib.auth import authenticate, get_user_model


User = settings.AUTH_USER_MODEL

def authenticated(request):
    print(request.data)
    email = request.data['email']
    password = request.data['password']
    user = authenticate(email=email, password=password)
    # qs = User.objects.all(email=email, password=password)[0]
    # print(qs)
    return user

