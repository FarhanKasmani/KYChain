export { addPlace, deletePlace } from './places';
export { tryAuth, authGetToken, authAutoSignIn, authLogout } from './auth';
export { aadharGet, compareFaces, faceVerify, otpVerifyAadhar, checkAadhar } from './aadhar';
export { kycSet, checkKYC, kycSetDetails, kycUnsetDetails } from './kyc';
export { panStatus, verifyElectricityBill, panElectricityGet } from './panElectricity';
export { uiStartLoading, uiStopLoading, screenStartLoading, screenStopLoading } from './ui';
export { viewPermissions, changePermission, setRequestingCompanyDetails } from './grantrevoke';
export { postIssue, viewIssues } from './cxteam';

const domainName = '172.16.1.181:8000';
const blockChainDomain = '192.168.43.134:3000';
export { domainName, blockChainDomain };
