from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, mixins, permissions
from rest_framework.authentication import SessionAuthentication
import json
from electricity.models import ElectricityBill
from rekognition.models import PanDetails
from kyc.models import KYCStatus
from blockchain.api.views import postUIDToBlockChainPanElectricity
from kyc.utils import generateUID

class ElectricityBillAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        consumerId = request.data["consumerId"]
        panNumber = request.data["panNumber"]
        qs = ElectricityBill.objects.filter(consumerId=consumerId)
        qs1 = PanDetails.objects.filter(pan_number=panNumber)
        if len(qs) > 0:
            obj = qs[0]
            obj1 = qs1[0]
            if (obj.name == obj1.name):
                # Generate UID
                uid = generateUID(obj1.name)
                
                ## POST request to blockchain with unique id and paramenters
                postUIDToBlockChainPanElectricity(uid, 'pan', panNumber, 'electricity', consumerId)
                temp = KYCStatus.objects.filter(user=request.user).update(status=True, uid=uid)
                data = {
                    "name": obj1.name,
                    "gender": obj1.gender,
                    "dob": obj1.dob,
                    "phone": obj1.phone,
                    "uid": uid,
                    "address": obj.address,
                }
                response = {"success": "KYC done successfully", "data": data}
                return Response(response)
            else:
                return Response({"error": "Names do not match"})

        else:
            return Response({"error": "Wrong customer ID"})


class ElectricityPanAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        consumerId = request.data["consumerId"]
        panNumber = request.data["panNumber"]
        qs = ElectricityBill.objects.filter(consumerId=consumerId)
        qs1 = PanDetails.objects.filter(pan_number=panNumber)
        obj = qs[0]
        obj1 = qs1[0]
        data = {
            "name": obj1.name,
            "address": obj.address,
            "gender": obj1.gender,
            "dob": obj1.dob,
            "phone": obj1.phone
        }
        response = {"data": data}
        return Response(response)

class PanAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        panNumber = request.data["panNumber"]
        qs1 = PanDetails.objects.filter(pan_number=panNumber)
        if len(qs1) > 0:
            return Response({"success": "Pan number exists"})
        else:
            return Response({"error": "Pan Number does not exists "})
