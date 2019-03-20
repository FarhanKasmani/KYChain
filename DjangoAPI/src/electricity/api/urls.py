from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from .views import ElectricityBillAPIView, ElectricityPanAPIView, PanAPIView

urlpatterns = [
    path("bill/", ElectricityBillAPIView.as_view()),
    path("details/", ElectricityPanAPIView.as_view()),
    path("get/", PanAPIView.as_view()),
]
