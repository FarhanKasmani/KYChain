import requests, json, os

LOGIN_ENDPOINT = "http://192.168.0.106:8000/api/auth/login/"
REGISTER_ENDPOINT = "http://0.0.0.0:8000/api/auth/register/"
FACE_ENDPOINT = "http://192.168.0.106:8000/api/rekognition/face/"

# headers = {
#     "Content-Type": "application/json"
# }
headers = {}

headers['Authorization'] = "JWT " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJ1c2VybmFtZSI6ImZhcmhhbkBnbWFpbC5jb20iLCJleHAiOjE1NTExMDE2NDQsImVtYWlsIjoiZmFyaGFuQGdtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNTUxMTAxMzQ0fQ.MBSoLTQYhHnO8iZ1hcIoVlcLkkjw7eKexnCEOFHb_NA'


# data = {
#     'email': 'farhan@gmail.com',
#     'password': 'farhan123',
# }
imageFile1='../assets/shreeya.jpg'
imageFile2='../assets/tenzu.jpg'
with open(imageFile1, 'rb') as im1, open(imageFile2, 'rb') as im2:
    data = {
        'original': im1,
        'cardPhoto': im2
    }

    r = requests.post(FACE_ENDPOINT, files=data, headers=headers)
    response = r.json()
    print(response)

# r = requests.post(LOGIN_ENDPOINT, data=json.dumps(data), headers=headers)
# response = r.json()
# print(response)


#
# ENDPOINT = "http://127.0.0.1:8000/api/status/"
# AUTH_ENDPOINT = "http://127.0.0.1:8000/api/auth/register/"
# REFRESH_ENDPOINT = AUTH_ENDPOINT + "refresh/"
# image_path = os.path.join(os.getcwd(), "mehmood.jpg")
#
# data = {
#     'username': 'farhan2',
#     'password': 'farhan123',
#     'password2': 'farhan123',
#     'email': 'farhan2@gmail.com'
# }
#
# headers = {
#     "Content-Type": "application/json"
# }

#headers['Authorization'] = "JWT " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImZhcmhhbiIsImV4cCI6MTU0OTQ3MzA5NywiZW1haWwiOiIiLCJvcmlnX2lhdCI6MTU0OTQ3Mjc5N30.wHup3_OBmsO_wmchVlC76XvG4LmNept565trdy1s_GI'

#
# r = requests.post(AUTH_ENDPOINT, data=json.dumps(data), headers=headers)
# token = r.json()
# print(token)

# headers['Authorization'] = "JWT " + token
# post_data = json.dumps({"content": "Some random content"})
# response = requests.post(ENDPOINT, data=post_data, headers=headers)
# print(response.text)


#
# r = requests.post(AUTH_ENDPOINT, data=json.dumps(data), headers=headers)
# token = r.json()['token']
# print(token)
#
# old_token = {
#     'token': token
# }
#
# new_response = requests.post(REFRESH_ENDPOINT, data=json.dumps(old_token), headers=headers)
# new_token    = new_response.json()['token']
#
# print(new_token)

# get_endpoint = ENDPOINT + str(12)
# post_data    = json.dumps({"content": "Some random content"})
#
# r = requests.get(get_endpoint)
# print(r.text)
#
# r2 = requests.get(ENDPOINT)
# print(r2.status_code)
#
# post_headers = {
#     'content-type': 'application/json'
# }
#
# post_response = requests.post(ENDPOINT, data=post_data, headers=post_headers)
# print(post_response.text)


# def do_img(method='get', data={}, is_json=True, img_path=None):
#     headers = {}
#     if is_json:
#         headers['content-type'] = 'application/json'
#         data = json.dumps(data)
#     if img_path is not None:
#         with open(image_path, 'rb') as image:
#             file_data = {
#                 'image': image
#             }
#             r = requests.request(method, ENDPOINT, data=data, files=file_data, headers=headers)
#     else:
#         r = requests.request(method, ENDPOINT, data=data, headers=headers)
#     print(r.text)
#     print(r.status_code)
#     return r
#
# do_img(method='put', data={'id': 13, 'user': 1, 'content':'Hello world'}, is_json=False, img_path=image_path)
#
# def do(method='get', data={}, is_json=True):
#     headers = {}
#     if is_json:
#         headers['content-type'] = 'application/json'
#         data = json.dumps(data)
#     r = requests.request(method, ENDPOINT, data=data, headers=headers)
#     print(r.text)
#     print(r.status_code)
#     return r

#do(data={'id': '6'})

#do(method='put', data={'id': 6, 'content': 'Cool new content', 'user': 1})

#do(method='post', data={'content': 'Hola', 'user': 1})
#do(method='delete', data={'id': 9})
