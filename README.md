# To Run the react project:

1. Go to src/store/actions/index and set the ip of django server in domainName and set the ip of hyperledger in blockChain domain.

To Run the django api:

1. Go to src/blockchain/api/views.py and set the ENDPOINT to hyperledger server

2. Go to src/rekognition/api/secret.py and set the AWS_ACCESS_KEY_ID = "", AWS_SECRET_ACCESS_KEY = "", AWS_DEFAULT_REGION = "", Account_sid = ""and Auth_token = ""

# ABOUT THE PROJECT:
Frequent cases of data leakage have brought into focus the security issues with different KYC programs. A consumer is expected to provide his personal identity for authentication to different companies through KYC but there is no restriction on how much data to be shared with the companies needing the KYC. Consumers should have full control over where and how much data is being used by the third parties

In this project we have developed a Mobile App and Web Portal where the user will have control over his/her personal data. The user will have to do the KYC process only once. Verification is done using Aadhar or PAN + Electricity bill using facial recognition methods, and OTP. After completing KYC on the system the user will receive a unique ID known as Uni-kyc.

Similarly, the companies will also have to register themselves on our platform. While registering, the companies need to mention the basic data requirements that they want from the users. These companies will have to use the API key provided by our platform to get the status and access the details of the user. All the transactions of the users will be stored on a permissioned blockchain (hyperledger). The users can grant & revoke access of the details provided to the companies that have inquired about the same.

MOBILE APP: Built using React Native Framework
WEB APP: Built using HTML5, Javascript.
HYPERLEDGER COMPOSER: It is an extensive, open development toolset and framework to make developing blockchain applications easier.
