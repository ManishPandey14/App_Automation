export const details = {
  type: 'General practitioner',
  diagnosis: 'Bronchitis'
};

export const detailsSpecialistConsultation = {
  type: 'Specialist Consultation',
  diagnosis: 'Abscess'
};

export const detailsDentalCare = {
  type: 'Dental Care',
  diagnosis: 'Dysarthria'
};

export const detailWellnessClaims = {
  type: 'Vaccination',
  diagnosis: 'Vaccination / Immunization'
};

export const detailsRefer = {
  type: 'Diagnostic X-Ray & Laboratory tests and imaging',
  diagnosis: 'Abdominal Pain'
};

export const receiptAmount = 500;

export const image = {
  ios:
    '//XCUIElementTypeCell[contains(@name,"Photo, Portrait, August 09, 2012")]',
  android: '//android.view.ViewGroup[contains(@content-desc,"Photo taken on")]'
};

export const dependent = 'Karen Brown Tan';

export const patientName = {
  ios: '(//XCUIElementTypeOther[@name="Peter Parker "])[2]',
  android: '//*[contains(@text,"Peter Parker")]'
};
export const selectPName = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Patient name, current selection is")])[last()]',
  android:
    '//android.view.ViewGroup[contains(@content-desc,"Patient name, current selection is")]'
};
export const isReimbursedAmountVisible = {
  ios: '~Reimbursed amount',
  android: '//*[@text="Reimbursed amount"]'
};

export const gmpPendingClaim = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Pending") and contains(@name,"General Medical Practitioner HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Pending"])/following-sibling::android.widget.TextView[@text="General Medical Practitioner"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const pendingClaimLoadedImage = {
  ios: '(//XCUIElementTypeOther[starts-with(@name,"Pending")])[2]',
  android:
    '//*[@text="Pending"]/parent::android.view.ViewGroup/parent::android.view.ViewGroup/parent::android.view.ViewGroup/android.view.ViewGroup[3]//*[@text=""]'
};

export const submitClaimButton = {
  ios: '(//XCUIElementTypeOther[@name="Submit Claim"])[4]',
  android: '~Submit Claim'
};

export const viewSubmittedClaim = {
  ios: '(//XCUIElementTypeOther[@name="View Submitted Claims"])[3]',
  android: '~View Submitted Claims'
};

export const specialistConsultationPendingClaim = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Pending") and contains(@name,"Specialist Consultation HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Pending"])/following-sibling::android.widget.TextView[@text="Specialist Consultation"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const dentalCarePendingClaim = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Pending") and contains(@name,"Dental Care HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Pending"])/following-sibling::android.widget.TextView[@text="Dental Care"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const receiptImage = {
  ios: '(//XCUIElementTypeOther[@name="View document of Receipts"])[7]',
  android: '//android.view.ViewGroup[@content-desc="View document of Receipts"]'
};

export const referralLetter = {
  ios: '(//XCUIElementTypeOther[@name="View document of Receipts"])[14]',
  android: '//*[@text="Referral letter"]'
};

export const outpatientClaimLabel = {
  ios:
    '//XCUIElementTypeStaticText[@name="Pending"]/following-sibling::XCUIElementTypeOther',
  android:
    '//*[@text="Pending"]/parent::android.view.ViewGroup/android.widget.TextView[contains(@text,"claim")]'
};

export const approvedClaim = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Approved") and contains(@name,"Dental Care HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Approved"])/following-sibling::android.widget.TextView[@text="Dental Care"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const approvedClaimGMP = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Approved") and contains(@name,"General Medical Practitioner HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Approved"])/following-sibling::android.widget.TextView[@text="General Medical Practitioner"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const verifyImageLoadedCheck = {
  ios: '//*[contains(@name,"assets/src/images/claimApprovedClaim")]',
  android: '//android.widget.ImageView'
};

export const approvedClaimLabel = {
  ios:
    '//XCUIElementTypeStaticText[@name="Approved"]/following-sibling::XCUIElementTypeOther',
  android:
    '//*[@text="Approved"]/parent::android.view.ViewGroup/android.widget.TextView[contains(@text,"claim")]'
};

export const settlementDate = {
  ios: '//XCUIElementTypeStaticText[@name="Settlement date"]',
  android: '//*[@text="Settlement date"]'
};

export const approvedClaimSC = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Approved") and contains(@name,"Specialist Consultation HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Approved"])/following-sibling::android.widget.TextView[@text="Specialist Consultation"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const backButton = {
  ios: '~header-back',
  android: '//android.widget.Button[@content-desc="Go back"]'
};

export const startInitialPendingText = {
  ios: '//XCUIElementTypeOther[@name="Pending"]',
  android: '//android.view.ViewGroup[@content-desc="Pending"]'
};

export const rejectedClaimForDentalCare = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Rejected") and contains(@name,"Dental Care HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Rejected"])/following-sibling::android.widget.TextView[@text="Dental Care"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const rejectedClaimSC = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Rejected") and contains(@name,"Specialist Consultation HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Rejected"])/following-sibling::android.widget.TextView[@text="Specialist Consultation"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const rejectedClaimLabel = {
  ios:
    '//XCUIElementTypeStaticText[@name="Rejected"]/following-sibling::XCUIElementTypeOther',
  android:
    '//*[@text="Rejected"]/parent::android.view.ViewGroup/android.widget.TextView[contains(@text,"claim")]'
};

export const verifyRejectedImageLoadedCheck = {
  ios: '//*[contains(@name,"assets/src/images/claimRejectedClaim")]',
  android: '//android.widget.ImageView'
};

export const rejectedClaimGMP = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Rejected") and contains(@name,"General Medical Practitioner HK$")])[16]',
  android:
    '(//android.view.ViewGroup[@content-desc="Rejected"])/following-sibling::android.widget.TextView[@text="General Medical Practitioner"]/following-sibling::*[position()=2][contains(@text, "HK$")]'
};

export const uniqueClaimNumber = {
  ios: '//XCUIElementTypeOther[contains(@name,"Claim ID is C-")]',
  android: '//android.widget.TextView[contains(@content-desc,"Claim ID is C-")]'
};

export const submittedClaim = {
  ios: '//XCUIElementTypeOther[contains(@name,"Claim submitted")]',
  android: '//android.widget.TextView[contains(@text,"Claim submitted")]'
};

export const consultationType = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Consultation type, current selection is")])[last()]',
  android: '~Consultation type, current selection is empty'
};
export const selectCType = {
  ios: '(//XCUIElementTypeOther[contains(@name,"Vaccination")])[last()]',
  android: '//android.widget.TextView[contains(@text,"Vaccination")]'
};
export const diagnosisText = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Diagnosis, current selection is")])[last()]',
  android: '~Diagnosis, current selection is empty'
};

export const selectDText = {
  ios:
    '(//XCUIElementTypeOther[contains(@name,"Vaccination / Immunization")])[last()]',
  android:
    '//android.widget.TextView[contains(@text,"Vaccination / Immunization")]'
};
