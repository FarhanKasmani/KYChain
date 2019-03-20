from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from .views import RequestUserAPIView, ViewRequestsAPIView, GrantRevokeAPIView

urlpatterns = [
    path("request/", RequestUserAPIView.as_view()),
    path("view/", ViewRequestsAPIView.as_view()),
    path("action/", GrantRevokeAPIView.as_view()),
]
