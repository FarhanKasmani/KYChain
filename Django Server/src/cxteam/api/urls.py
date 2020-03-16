from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from .views import CXTeamAPIView, CXTeamUserAPIView, CXTeamOrgAPIView, CXTeamPostAPIView

urlpatterns = [
    path("get/", CXTeamAPIView.as_view()),
    path("getuser/", CXTeamUserAPIView.as_view()),
    path("getorg/", CXTeamOrgAPIView.as_view()),
    path("postissue/", CXTeamPostAPIView.as_view()),
]
