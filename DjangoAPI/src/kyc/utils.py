import random

def generateUID(name):
    return name[0:4] + str(random.randint(400000, 700000))

def convertData(data):
    newData = {
        "Name": data['name'],
        "Address": data['address'],
        "Mobile Number": data['phone'],
        "Date of Birth": data['dob'],
        "Gender": data['gender']
    }
    return newData