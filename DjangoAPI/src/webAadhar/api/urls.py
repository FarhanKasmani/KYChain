from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from .views import (KYCStatusWebAPIView, FaceVerifyWebAPIView, OTPSendWebAPIView, OTPVerifyAadharWebAPIView, ElectricityBillWebAPIView, ViewRequestsWebAPIView, GrantRevokeWebAPIView, AadharWebAPIView, PanWebAPIView)

urlpatterns = [
    path("kycStatus/", KYCStatusWebAPIView.as_view()),
    path("faceVerify/", FaceVerifyWebAPIView.as_view()),
    path("otpSend/", OTPSendWebAPIView.as_view()),
    path("addUser/", OTPVerifyAadharWebAPIView.as_view()),
    path("bill/", ElectricityBillWebAPIView.as_view()),
    path("view/", ViewRequestsWebAPIView.as_view()),
    path("action/", GrantRevokeWebAPIView.as_view()),
    path("checkAadhar/", AadharWebAPIView.as_view()),
    path("checkPan/", PanWebAPIView.as_view()),
]
