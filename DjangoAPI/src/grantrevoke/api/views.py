from rest_framework.views import APIView
from grantrevoke.models import Organisation, RequestingOrganisation
from kyc.models import KYCStatus
from rest_framework.response import Response
from rest_framework import generics, mixins, permissions
from blockchain.api.views import grantPermissionOnAttribute, revokePermissionOnAttribute
from kyc.models import KYCStatus
from blockchain.api.views import getAllAttributesBlockChain, getDoctypeValueBlockChain
from rekognition.models import AadharDetails, PanDetails
from electricity.models import ElectricityBill

class RequestUserAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        apiKey = request.data["key"]
        qs = Organisation.objects.filter(key=apiKey)
        if len(qs) == 0:
            return Response({"error": "Wrong API key used"})
        org = qs[0]
        

        # Organisation is valid
        qs1 = KYCStatus.objects.filter(uid=request.data["uid"])
        requestedData = request.data["data"]
        userData = {}
        if len(qs1) == 0:
            return Response({"error": "UID does not exist"})
        else:
            uid = qs1[0].uid
            result = getAllAttributesBlockChain(uid)
            obj = getDoctypeValueBlockChain(uid)
            addr = ''
            if obj.get("aadhar"):
                myqs = AadharDetails.objects.filter(aadhar_number=obj.get('aadhar'))[0]
                addr = myqs.address
            else:
                myqs = PanDetails.objects.filter(pan_number=obj.get('pan'))[0]
                mmyqs = ElectricityBill.objects.filter(consumerId=obj.get('consumerId'))[0]
                print(myqs)
                print(mmyqs)
                addr = mmyqs.address
            userData = {
                'name': myqs.name,
                'gender': myqs.gender,
                'dob': myqs.dob,
                'phone': myqs.phone,
                'address': addr 
            }
        print(userData)
        orgData = []
        
        for each in requestedData:
            if org.key in result.get(each):
                t = {
                    'key':each,
                    'value':userData[each]
                }
                orgData.append(t)
        

        user = qs1[0].user

        check = RequestingOrganisation.objects.filter(
            user=user, organisation=org, attributes=requestedData
        )
        print(orgData)
        print(check)
        if len(check) == 0:
            obj = RequestingOrganisation.objects.create(
                user=user, organisation=org, attributes=requestedData
            )
            obj.save()

        return Response({"success": "Request sent successfully", "data": orgData})


class ViewRequestsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print("Inside view requests api view")
        user = request.user
        qs = RequestingOrganisation.objects.filter(user=user)
        print(qs)
        uid = KYCStatus.objects.filter(user=user)[0].uid
        response = {}
        if uid:
            # Query block chain and get all the details of attributes for uid
            result = getAllAttributesBlockChain(uid)
            print(result)

        for each in qs:
            print(each)
            print(each.organisation)
            org = each.organisation.name
            data = each.attributes
            statusAttributes = {}
            for attribute in data:
                # If uid exists, check the key presence in attribute array of blockchain
                if uid and result.get(attribute) and each.organisation.key in result.get(attribute):
                    statusAttributes[attribute] = True
                else:
                    statusAttributes[attribute] = False
            key = each.organisation.key
            print("Hi")
            print(response)
            response[org] = {"data": statusAttributes, "key": key}
            print(response)
        return Response(response)


class GrantRevokeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        uid = KYCStatus.objects.filter(user=user)[0].uid
        attributeName = request.data["attribute"]
        key = request.data["key"]
        action = request.data["action"]

        print("Change Permission Details:")
        print("UID: "+uid)
        print("KEY: "+key)
        print("ACTION: "+action)
        print("ATTRIBUTE NAME: "+attributeName)
        if action == "grant":
            # Call blockchain and append key in attribute array of uid
            grantPermissionOnAttribute(uid, key, attributeName)
        elif action == "revoke":
            # Call blockchain and remove key in attribute array of uid
            revokePermissionOnAttribute(uid, key, attributeName)

        return Response({"success": "Done successfully"})

# class AddOrganisationAPIView(APIView):
#     permission_classes = []
#     authentication_classes = []

#     def post(self, request, *args, **kwargs):
#         name = request.data['name']
#         key = str(random.randint(400000, 700000))
#         obj = Organisation.objects.create(name=name, key=key)
#         return Response({"key": key})

