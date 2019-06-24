from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, mixins, permissions
from cxteam.models import UserIssues
from grantrevoke.models import Organisation
from kyc.models import KYCStatus


class CXTeamPostAPIView(APIView):
    # authentication_classes = []
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        orgKey = request.data["key"]
        issue = request.data["issue"]
        print(orgKey)
        print(issue)
        user = request.user
        print(user)

        if orgKey == "all":
            orgObj = None    
        else:
            orgObj = Organisation.objects.filter(key=orgKey)[0]
        kycObj = KYCStatus.objects.filter(user=user)[0]

        newObj = UserIssues(
            user=user, organisation=orgObj, user_query=issue, kycStatus=kycObj
        )
        newObj.save()
        return Response({"success": "Issue sucessfully sent"})


class CXTeamAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):
        qs = UserIssues.objects.all()
        response = []
        for each in qs:
            if each.organisation:
                name = each.organisation.name
                key = each.organisation.key,
            else:
                name = "General Query"
                key = "None"
            data = {
                "email": each.user.email,
                "uid": each.kycStatus.uid,
                "issue": each.user_query,
                "orgName": name,
                "orgKey": key,
            }
            response.append(data)
        return Response(response)


class CXTeamUserAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        uid = request.data["uid"]
        kycObj = KYCStatus.objects.filter(uid=uid)[0]
        print(kycObj)
        print("Heeloo")
        qs = UserIssues.objects.filter(kycStatus=kycObj)
        print(qs)
        response = []
        for each in qs:
            response.append(
                {
                    "issue": each.user_query,
                    "orgName": each.organisation.name,
                    "orgKey": each.organisation.key,
                }
            )
        return Response(response)


class CXTeamOrgAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        key = request.data["key"]
        orgObj = Organisation.objects.filter(key=key)[0]
        qs = UserIssues.objects.filter(organisation=orgObj)
        response = []
        for each in qs:
            response.append(
                {
                    "issue": each.user_query,
                    "userEmail": each.user.email,
                    "uid": each.kycStatus.uid,
                }
            )
        return Response(response)
