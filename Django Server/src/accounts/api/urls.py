from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from .views import LoginAPIView, RegisterAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view()),
    path('register/', RegisterAPIView.as_view()),
    path('jwt/', obtain_jwt_token),
    path('jwt/refresh/', refresh_jwt_token),
]
