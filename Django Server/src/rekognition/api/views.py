from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, mixins, permissions
from rekognition.models import AadharDetails, PanDetails
from kyc.models import KYCStatus
from rest_framework.authentication import SessionAuthentication
from rest_framework.parsers import MultiPartParser
import json
import boto3
from rest_framework import status
from twilio.rest import Client
from blockchain.api.views import getDoctypeValueBlockChain, postUIDToBlockChain
from kyc.utils import generateUID
from .secret import (
    aws_ACCESS_KEY_ID,
    aws_DEFAULT_REGION,
    aws_SECRET_ACCESS_KEY,
    Account_sid,
    Auth_token,
)

AWS_ACCESS_KEY_ID = aws_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = aws_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION = aws_DEFAULT_REGION

client = boto3.client(
    "rekognition",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION,
)


class FaceCompareAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    # authentication_classes = [SessionAuthentication]
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        print(request.data)
        original_photo = request.data["original"]
        card_photo = request.data["cardPhoto"]
        if original_photo and card_photo:
            response = client.compare_faces(
                SourceImage={"Bytes": original_photo.read()},
                TargetImage={"Bytes": card_photo.read()},
            )
            print(response)
            return Response({"success": "Done"})
        else:
            return Response({"error": "Image not recieved properly"})
        # , status=401


class FaceVerifyAPIView(APIView):
    permission_classes = []
    # authentication_classes = []

    parser_classes = (MultiPartParser,)

    def getAadharDetails(self, aadharNumber):
        obj = AadharDetails.objects.filter(aadhar_number=aadharNumber)
        data = {}
        if len(obj) > 0:
            obj = obj[0]
            data = {
                "aadharNumber": obj.aadhar_number,
                "name": obj.name,
                "dob": obj.dob,
                "address": obj.address,
                "phone": obj.phone,
                "gender": obj.gender,
            }
        return data, obj, "Aadhar"

    def getPanDetails(self, panNumber):
        obj = PanDetails.objects.filter(pan_number=panNumber)
        data = {}
        if len(obj) > 0:
            obj = obj[0]
            data = {
                "panNumber": obj.pan_number,
                "name": obj.name,
                "dob": obj.dob,
                "phone": obj.phone,
                "gender": obj.gender,
            }
        return data, obj, "Pan"
        pass

    def post(self, request, *args, **kwargs):
        print(request.data)
        original_photo = request.data["original"]
        # a = request.data.get("aadharNumber")
        # print(original_photo)
        # print(a)
        # print(original_photo)
        if request.data.get("aadharNumber"):
            aadharNumber = request.data["aadharNumber"]
            data, obj, doc = self.getAadharDetails(aadharNumber)
            print(aadharNumber)
        elif request.data.get("panNumber"):
            panNumber = request.data["panNumber"]
            data, obj, doc = self.getPanDetails(panNumber)
            print(panNumber)
        print(original_photo)
        if original_photo:
            if data:
                try:
                    response = client.compare_faces(
                        SourceImage={"Bytes": original_photo.read()},
                        TargetImage={"Bytes": obj.image.read()},
                    )
                    print(response)
                except:
                    print("error")
                    return Response({"error": "Face is not matching, please try again"})
                print("Hello")
                if len(response["FaceMatches"]) > 0:
                    print(response["FaceMatches"])
                    # if doc == "Aadhar":
                    #     # Generate UID
                    #     uid = generateUID(obj.name)
                    #     data["uid"] = uid
                    #     # POST request to blockchain with unique id
                    #     postUIDToBlockChain(uid, doc, str(data['aadharNumber']))
                    #     # Update status only if aadhar

                    #     obj = KYCStatus.objects.filter(user=request.user).update(status=True, uid=uid)
                    # if doc == "Aadhar":
                    #     return Response(
                    #         {"success": "Your face matched successfully", "data": data}
                    #     )
                    # else:
                    return Response(
                        {"success": "Your Face matched sucessfully", "data": data}
                    )
                else:
                    return Response({"error": "Face is not matching, please try again"})
            else:
                return Response({"error": doc + " not found"})
        else:
            return Response({"error": "Image not recieved properly"})


class OTPSendAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        otp = request.data["otp"]
        aadharNumber = request.data["aadharNumber"]
        if otp and aadharNumber:
            qs = AadharDetails.objects.filter(aadhar_number=aadharNumber)
            if len(qs) > 0:
                # mobile_number = qs[0].phone
                # account_sid = Account_sid
                # auth_token = Auth_token
                # client = Client(account_sid, auth_token)
                # client.messages.create(
                #     to="+91" + str(qs[0].phone),
                #     from_="+15709895673",
                #     body="Your OTP is" + otp,
                # )
                return Response({"success": "OTP sent"})
            else:
                return Response({"error": "Aadhar not found"})
        else:
            return Response({"error": "OTP not recieved properly"})


class KYCStatusAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print("Check KYC called")
        user = request.user
        obj = KYCStatus.objects.filter(user=request.user)[0]
        status = obj.status
        response = {"status": status}
        if status:
            # Call Blockchain with UID to get doctype and value
            result = getDoctypeValueBlockChain(obj.uid)
            response["uid"] = obj.uid
            response["data"] = result
        return Response(response)


class AadharAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        qs = AadharDetails.objects.filter(aadhar_number=request.data["aadharNumber"])
        if len(qs) > 0:
            response = {
                "data": {
                    "aadharNumber": qs[0].aadhar_number,
                    "name": qs[0].name,
                    "gender": qs[0].gender,
                    "dob": qs[0].dob,
                    "address": qs[0].address,
                    "phone": qs[0].phone,
                }
            }
            print(response)
            return Response(response)
        else:
            return Response({"error": "Aadhar Number not found"})


class OTPVerifyAadharAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        aadharNumber = request.data["aadharNumber"]
        if aadharNumber:
            qs = AadharDetails.objects.filter(aadhar_number=aadharNumber)
            if len(qs) > 0:
                uid = generateUID(qs[0].name)
                # POST request to blockchain with unique id
                postUIDToBlockChain(uid, "aadhar", qs[0].aadhar_number)
                obj = KYCStatus.objects.filter(user=request.user).update(
                    status=True, uid=uid
                )
                return Response(
                    {
                        "success": "OTP successfully matched",
                        "data": {
                            "aadharNumber": qs[0].aadhar_number,
                            "name": qs[0].name,
                            "gender": qs[0].gender,
                            "dob": qs[0].dob,
                            "address": qs[0].address,
                            "phone": qs[0].phone,
                            "uid": uid,
                        },
                    }
                )
            else:
                return Response({"error": "Aadhar not found"})
        else:
            return Response({"error": "Aadhar not recieved properly"})
