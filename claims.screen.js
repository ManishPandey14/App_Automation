import AppScreen from './app.screen';

const SELECTOR = {
  BUTTON_MAKE_A_CLAIM: '~Make a new claim',
  BUTTON_ADD_CLAIM_DETAILS: '~Add Claim Details',
  BUTTON_ADD_DOCUMENTS: '~Add Documents',
  BUTTON_REVIEW_CLAIM: '~Review Claim',
  BUTTON_SUBMIT_CLAIM: '~Submit Claim',
  BUTTON_ACCEPT_TERMS_CONDITIONS: '~Accept Terms & Conditions',
  SELECT_PATIENT_NAME: '~Patient name, current selection is William Brown',
  SELECT_CONSULTATION_TYPE: '~Consultation type, current selection is empty',
  SELECT_DIAGNOSIS: '~Diagnosis, current selection is empty',
  DATE_CONSULTATION_DATE: '~Consultation date, current selection is empty',
  INPUT_CONTACT_NUMBER: '~Contact number',
  INPUT_RECEIPT_AMOUNT: '~Receipt amount',
  CLAIM_AMOUNT: '~Claim amount',
  PHOTO_ADD_DOCUMENT_RECEIPTS: '~Add document for Receipts',
  PHOTO_ADD_DOCUMENT_FOR_REFERRAL_LETTER: '~Add document for Referral letter',
  SETTLEMENT_DATE: '~Settlement date'
};

class ClaimsScreen extends AppScreen {
  constructor() {
    super(SELECTOR.MAKE_A_CLAIM);
  }

  get buttonMakeClaim() {
    return $(SELECTOR.BUTTON_MAKE_A_CLAIM);
  }

  get buttonAddClaimDetails() {
    return $(SELECTOR.BUTTON_ADD_CLAIM_DETAILS);
  }

  get buttonButtonAddDocuments() {
    return $(SELECTOR.BUTTON_ADD_DOCUMENTS);
  }

  get buttonReviewClaim() {
    return $(SELECTOR.BUTTON_REVIEW_CLAIM);
  }

  get buttonSubmitClaim() {
    return $(SELECTOR.BUTTON_SUBMIT_CLAIM);
  }

  get buttonAcceptTermsConditions() {
    return $(SELECTOR.BUTTON_ACCEPT_TERMS_CONDITIONS);
  }

  get selectPatientName() {
    return $(SELECTOR.SELECT_PATIENT_NAME);
  }

  get selectConsultationType() {
    return $(SELECTOR.SELECT_CONSULTATION_TYPE);
  }

  get selectDiagnosis() {
    return $(SELECTOR.SELECT_DIAGNOSIS);
  }

  get dateConsultationDate() {
    return $(SELECTOR.DATE_CONSULTATION_DATE);
  }

  get inputContactNumber() {
    return $(SELECTOR.INPUT_CONTACT_NUMBER);
  }

  get inputReceiptAmount() {
    return $(SELECTOR.INPUT_RECEIPT_AMOUNT);
  }
  get claimsAmount() {
    return $(SELECTOR.CLAIMS_AMOUNT);
  }
  get photoAddDocumentReceipts() {
    return $(SELECTOR.PHOTO_ADD_DOCUMENT_RECEIPTS);
  }

  get photoAddDocumentForReferralLetter() {
    return $(SELECTOR.PHOTO_ADD_DOCUMENT_FOR_REFERRAL_LETTER);
  }

  get settlementDate() {
    return $(SELECTOR.SETTLEMENT_DATE);
  }
}

export default new ClaimsScreen();
