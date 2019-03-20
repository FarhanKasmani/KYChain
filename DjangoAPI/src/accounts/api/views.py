from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q

from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER

from .serializers import UserRegisterSerializer
from .permissions import AnonPermissionOnly

User = get_user_model()

from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication,
    TokenAuthentication,
)


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class LoginAPIView(APIView):
    # permission_classes = [CsrfExemptSessionAuthentication, BasicAuthentication]
    # permission_classes = [AnonPermissionOnly]
    # authentication_classes = [CsrfExemptSessionAuthentication, TokenAuthentication]
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        print(request.data)
        if request.user.is_authenticated:
            return Response({"detail": "You are already authenticated"})
        data = request.data
        print(request.data)
        email = data.get("email")
        password = data.get("password")
        print(email)
        print(password)
        user = authenticate(email=email, password=password)
        print(user)
        if user:
            qs = User.objects.filter(Q(email__iexact=email)).distinct()
            if qs.count() == 1:
                user_obj = qs.first()
                if user_obj.check_password(password):
                    user = user_obj
                    payload = jwt_payload_handler(user)
                    token = jwt_encode_handler(payload)
                    response = jwt_response_payload_handler(token, user, request=request)
                    return Response(response)
            return Response({"detail": "Invalid credentials"}, status=401)
        else:
            return Response({"error": "Login failed"})

class RegisterAPIView(generics.CreateAPIView):
    # permission_classes = [AnonPermissionOnly]
    # authentication_classes = [CsrfExemptSessionAuthentication, TokenAuthentication]
    permission_classes = []
    authentication_classes = []

    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AnonPermissionOnly]

    # To pass request object in serilizers method
    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}
