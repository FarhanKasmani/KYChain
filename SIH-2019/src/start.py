#Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)

import boto3

if __name__ == "__main__":
    AWS_ACCESS_KEY_ID = 'AKIAJPDJUEVNWAZRXJIA'
    AWS_SECRET_ACCESS_KEY = 'jwztC6FaXDn9Wm5pBdHFjhV9CK/JY1/86eY+dsr4'
    AWS_DEFAULT_REGION = 'us-east-1'

    imageFile1='../assets/shreeya.jpg'
    imageFile2='../assets/tenzu.jpg'

    client=boto3.client('rekognition',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_DEFAULT_REGION
    )
   
    with open(imageFile1, 'rb') as image1, open(imageFile2, 'rb') as image2 :
        # response1 = client.detect_text(Image={'Bytes': image1.read()})
        # response2 = client.detect_labels(Image={'Bytes': image.read()})
        print(image1)
        print(type(image1.read()))
        response3 = client.compare_faces(
            SourceImage={'Bytes': image1.read()}, 
            TargetImage={'Bytes': image2.read()}
        )

 
    # print('Detected text in ' + imageFile1)    
    # for label in response1['TextDetections']:
    #     print (label['DetectedText'] + ' : ' + str(label['Confidence']))

    # print('Done...')

    # print('Detected labels in ' + imageFile)    
    # for label in response2['Labels']:
    #     print (label['Name'] + ' : ' + str(label['Confidence']))

    # print('Done...')

    print(response3)