import requests, json, os

ENDPOINT = "http://172.16.2.25:3000/"

def getDoctypeValueBlockChain(uid):
    # Get Doctype and value from blockchain
    # 'aadhar' or 'pan'
    # {'aadhar': '12345'} or {'pan': '12345', 'consumerId': '12345'}
    global ENDPOINT
    URL = ENDPOINT + 'api/User/' + uid
    headers = {
        "Content-Type": "application/json"
    }
    r = requests.get(URL, headers=headers)
    response = r.json()
    
    docType = response['docType'][0]
    value = response['value'][0]
    if docType == 'aadhar':
        return {docType: value}
    else:
        return {"pan": value[0:10], "consumerId": value[10:]}
    #return {"aadhar": "600031600300"}
    # return {"pan": "ETDPK3884G", 'consumerId': '1234567'}

def grantPermissionOnAttribute(uid, key, attributeName):
    # Append key of org in array of attributeName in blockchain
    global ENDPOINT
    URL = ENDPOINT + 'api/grantAccess'
    data = {
        "$class": "org.kychain.co.grantAccess",
        "user": uid,
        "attribute": attributeName,
        "companyName": key,
    }
    headers = {"Content-Type": "application/json"}
    r = requests.post(URL, data=json.dumps(data), headers=headers)
    response = r.json()
    print(response)

def revokePermissionOnAttribute(uid, key, attributeName):
    #Remove key of org in array of attributeName in blockchain
    global ENDPOINT
    URL = ENDPOINT + 'api/revokeAccess'
    data = {
        "$class": "org.kychain.co.revokeAccess",
        "user": uid,
        "attribute": attributeName,
        "companyName": key,
    }
    headers = {"Content-Type": "application/json"}
    r = requests.post(URL, data=json.dumps(data), headers=headers)
    response = r.json()
    print(response)

def getAllAttributesBlockChain(uid):
    global ENDPOINT
    # Get all the attributes
    URL = ENDPOINT + 'api/User/' + uid
    headers = {
        "Content-Type": "application/json"
    }
    r = requests.get(URL, headers=headers)
    response = r.json()
    result = {
        "name": response["name"],
        "dob": response["dob"],
        "address": response["address"],
        "phone": response["phone"],
        "gender": response["gender"]
    }
    return result
    # return {'first_name': ['1234', '132324', '6645645'], 'last_name': ['5345', '4674']}

def postUIDToBlockChain(uid, docType, value):
    global ENDPOINT
    # POST above attributes to blockchain
    URL = ENDPOINT + "api/User"
    data = {
        "$class": "org.kychain.co.User",
        "userId": uid,
        "docType": ["aadhar"],
        "value": [value],
    }
    headers = {"Content-Type": "application/json"}
    r = requests.post(URL, data=json.dumps(data), headers=headers)
    response = r.json()
    print(response)

def postUIDToBlockChainPanElectricity(uid, pan, panNumber, electricity, consumerId):
    global ENDPOINT
    # POST above attributes to blockchain
    URL = ENDPOINT + "api/User"
    data = {
        "$class": "org.kychain.co.User",
        "userId": uid,
        "docType": ["panElectricity"],
        "value": [panNumber+consumerId],
    }
    headers = {"Content-Type": "application/json"}
    r = requests.post(URL, data=json.dumps(data), headers=headers)
    response = r.json()
    print(response)

#postUIDToBlockChain('M323', 'aadhar', '134534827845')
#postUIDToBlockChainPanElectricity('M456', 'pan', 'ETGHFJSHYT', 'electricity', '7788546')
#print(getDoctypeValueBlockChain('M456'))
# print(getDoctypeValueBlockChain('M456'))

# print(getAllAttributesBlockChain('M323'))
# print(getAllAttributesBlockChain('M456'))
