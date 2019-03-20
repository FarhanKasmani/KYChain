import requests, json
ENDPOINT = "https://certificate-verification-faecb.firebaseio.com/home/-LYIiZsQoTK95VICgA-J.json"

headers = {
    "Content-Type": "application/json"
}

#headers['Authorization'] = "JWT " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4LCJ1c2VybmFtZSI6InNvaGFpbEBnbWFpbC5jb20iLCJleHAiOjE1NDk1NTA4NzMsImVtYWlsIjoic29oYWlsQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTQ5NTUwNTczfQ.SKT4WtP8-lDGYuhHO5jqu8fx9yQnHws7iB3jjRmLUNM'


data = {
    'location': 'Mumbai'
}

r = requests.patch(ENDPOINT, data=json.dumps(data), headers=headers)
response = r.json()
print(response)
