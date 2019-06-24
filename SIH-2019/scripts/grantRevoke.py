import requests, json, os

LOGIN_ENDPOINT = "http://10.120.106.83:8000/api/grantrevoke/request/"

headers = {"Content-Type": "application/json"}

# headers["Authorization"] = (
#     "JWT "
#     + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJ1c2VybmFtZSI6ImZhcmhhbkBnbWFpbC5jb20iLCJleHAiOjE1NTExMDE2NDQsImVtYWlsIjoiZmFyaGFuQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTUxMTAxMzQ0fQ.MBSoLTQYhHnO8iZ1hcIoVlcLkkjw7eKexnCEOFHb_NA"
# )


data = {"uid": "1234", "key": "abcd", "data": ["first_name"]}

r = requests.post(LOGIN_ENDPOINT, data=json.dumps(data), headers=headers)
response = r.json()
print(response)

