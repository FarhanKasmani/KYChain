from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from webExtra.utils import authenticated
from blockchain.api.views import (
    getDoctypeValueBlockChain,
    grantPermissionOnAttribute,
    revokePermissionOnAttribute,
    getAllAttributesBlockChain,
    postUIDToBlockChain,
    postUIDToBlockChainPanElectricity,
)
from rest_framework.parsers import MultiPartParser

User = settings.AUTH_USER_MODEL
from kyc.utils import generateUID

# models
from cxteam.models import UserIssues
from electricity.models import ElectricityBill
from grantrevoke.models import Organisation, RequestingOrganisation
from kyc.models import KYCStatus
from rekognition.models import AadharDetails, PanDetails
import boto3
from rekognition.api.secret import (
    Account_sid,
    Auth_token,
    aws_ACCESS_KEY_ID,
    aws_DEFAULT_REGION,
    aws_SECRET_ACCESS_KEY,
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


# To check status of user
class KYCStatusWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        print("Entered KYC status function")
        user = authenticated(request)
        obj = KYCStatus.objects.filter(user=user)[0]
        status = obj.status
        response = {"status": status}
        if status:
            # Call Blockchain with UID to get doctype and value
            result = getDoctypeValueBlockChain(obj.uid)
            response["uid"] = obj.uid
            response["data"] = result
        return Response(response)


# To compare faces of aadhar and pan
class FaceVerifyWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []
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

    def post(self, request, *args, **kwargs):
        print("Entered face verify function")
        user = authenticated(request)
        print(request.data)
        original_photo = request.data["original"]
        n = ""
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
                except:
                    print("error")
                    return Response({"error": "Face is not matching, please try again"})
                print("Hello")
                if len(response["FaceMatches"]) > 0:
                    if doc == "Aadhar":
                        qs = AadharDetails.objects.filter(aadhar_number=aadharNumber)
                        uid = generateUID(qs[0].name)
                        # POST request to blockchain with unique id
                        postUIDToBlockChain(uid, doc, aadharNumber)
                        obj = KYCStatus.objects.filter(user=user).update(
                            status=True, uid=uid
                        )
                        data["uid"] = uid
                        return Response(
                            {"success": "Your KYC done sucessfully", "uid": uid}
                        )
                    else:
                        return Response({"success": "Your Face matched sucessfully"})
                else:
                    return Response({"error": "Face is not matching, please try again"})
            else:
                return Response({"error": doc + " not found"})
        else:
            return Response({"error": "Image not recieved properly"})


# To send OTP to registered mobile number of aadhar
class OTPSendWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        otp = request.data["otp"]
        aadharNumber = request.data["aadharNumber"]
        print(otp)
        print(aadharNumber)
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
                return Response({"error": "Aadhar does not exist"})
        else:
            return Response({"error": "Not able to send OTP"})


# After sending OTP registering user in blockchain
class OTPVerifyAadharWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        aadharNumber = request.data["aadharNumber"]
        user = authenticated(request)
        if aadharNumber:
            qs = AadharDetails.objects.filter(aadhar_number=aadharNumber)
            if len(qs) > 0:
                uid = generateUID(qs[0].name)
                # POST request to blockchain with unique id
                postUIDToBlockChain(uid, "aadhar", qs[0].aadhar_number)
                obj = KYCStatus.objects.filter(user=user).update(status=True, uid=uid)
                return Response(
                    {
                        "success": "User successfully added to blockchain",
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
                return Response({"error": "Netwrok in aadhar qs"})
        else:
            return Response({"error": "Aadhar not recieved properly"})


# For electricity bill consumer id verification with pan number
class ElectricityBillWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        consumerId = request.data["consumerId"]
        panNumber = request.data["panNumber"]
        user = authenticated(request)
        qs = ElectricityBill.objects.filter(consumerId=consumerId)
        qs1 = PanDetails.objects.filter(pan_number=panNumber)
        if len(qs) > 0:
            obj = qs[0]
            obj1 = qs1[0]
            if obj.name == obj1.name:
                # Generate UID
                uid = generateUID(obj1.name)

                ## POST request to blockchain with unique id and paramenters
                postUIDToBlockChainPanElectricity(
                    uid, "pan", panNumber, "electricity", consumerId
                )
                temp = KYCStatus.objects.filter(user=user).update(status=True, uid=uid)
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
            return Response({"customer": "Wrong customer ID"})


# View Organisation requesting for details
class ViewRequestsWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        print("Inside view requests api view")
        user = authenticated(request)
        print(user)
        qs = RequestingOrganisation.objects.filter(user=user)
        print(qs)
        uid = KYCStatus.objects.filter(user=user)[0].uid
        response = {}
        if uid:
            # Query block chain and get all the details of attributes for uid
            result = getAllAttributesBlockChain(uid)
            print(result)
            print(qs)
            for each in qs:
                print(each)
                print(each.organisation)
                org = each.organisation.name
                data = each.attributes
                statusAttributes = {}
                for attribute in data:
                    # If uid exists, check the key presence in attribute array of blockchain
                    if (
                        uid
                        and result.get(attribute)
                        and each.organisation.key in result.get(attribute)
                    ):
                        statusAttributes[attribute] = "True"
                    else:
                        statusAttributes[attribute] = "False"
                key = each.organisation.key
                response[org] = {"data": statusAttributes, "key": key}
                print("Hi")
                print(response)
        else:
            return Response({"error": "User has not completed KYC"})
        print(response)
        return Response(response)


# Grant Revoke organisation
class GrantRevokeWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        user = authenticated(request)
        uid = KYCStatus.objects.filter(user=user)[0].uid
        attributeName = request.data["attribute"]
        key = request.data["key"]
        action = request.data["action"]

        print("Change Permission Details:")
        print("UID: " + uid)
        print("KEY: " + key)
        print("ACTION: " + action)
        print("ATTRIBUTE NAME: " + attributeName)
        if action == "grant":
            # Call blockchain and append key in attribute array of uid
            grantPermissionOnAttribute(uid, key, attributeName)
        elif action == "revoke":
            # Call blockchain and remove key in attribute array of uid
            revokePermissionOnAttribute(uid, key, attributeName)

        return Response({"success": "Done successfully"})


# To check aadhar exists or not
class AadharWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
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


# To check pan exists or not
class PanWebAPIView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        panNumber = request.data["panNumber"]
        qs1 = PanDetails.objects.filter(pan_number=panNumber)
        if len(qs1) > 0:
            return Response({"success": "Pan number exists"})
        else:
            return Response({"error": "Pan Number does not exists "})

