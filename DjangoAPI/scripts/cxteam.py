import requests, json, os

# Get all issues
GETALL = "http://192.168.43.19:8000/api/cxteam/get/"
r = requests.get(GETALL)
response = r.json()
print(response)

# Get issues of particular user
GETFORUSER = "http://192.168.43.19:8000/api/cxteam/getuser/"
data = {"uid": "Farh5703"}
headers = {"Content-Type": "application/json"}
r = requests.post(GETFORUSER, data=json.dumps(data), headers=headers)
response = r.json()
print(response)


# Get issues raised against organisation
GETFORORG = "http://192.168.43.19:8000/api/cxteam/getorg/"
data = {"key": "PPPP"}
headers = {"Content-Type": "application/json"}
r = requests.post(GETFORORG, data=json.dumps(data), headers=headers)
response = r.json()
print(response)

