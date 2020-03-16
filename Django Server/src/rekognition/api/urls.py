from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from .views import (
    FaceCompareAPIView,
    FaceVerifyAPIView,
    OTPSendAPIView,
    KYCStatusAPIView,
    AadharAPIView,
    OTPVerifyAadharAPIView,
)

urlpatterns = [
    path("face/", FaceCompareAPIView.as_view()),
    path("faceVerify/", FaceVerifyAPIView.as_view()),
    path("otpVerifyAadhar/", OTPVerifyAadharAPIView.as_view()),
    path("otpSend/", OTPSendAPIView.as_view()),
    path("kycStatus/", KYCStatusAPIView.as_view()),
    path("aadhar/", AadharAPIView.as_view()),
]
