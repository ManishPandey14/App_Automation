import {
  _patientDetails,
  _claimDetails,
  _addDocuments,
  _reviewClaim,
  _termsConditions,
  _viewSubmittedClaims,
  _clickPendingClaims,
  _reimbursedAmount,
  _checkLoadedImageOnPendingClaims,
  _getSettlementDate,
  _receiptImage,
  _referralLetter,
  _outpatientClaimLabel,
  _approvedClaims,
  _checkLoadedImageOnApprovedClaims,
  _backButton,
  _startFromIntial,
  _rejectedClaims,
  _wellnessClaimDetails,
  _uniqueClaimNumberIsDisplay,
  _claimSubmittedIsDisplay,
  _patientDetailsDep,
  _anotherInsure
} from './internal/_claims';
import {
  details,
  detailWellnessClaims,
  detailsRefer,
  receiptAmount,
  claimAmount,
  image,
  dependent,
  isReimbursedAmountVisible,
  viewSubmittedClaim,
  gmpPendingClaim,
  pendingClaimLoadedImage,
  submitClaimButton,
  detailsSpecialistConsultation,
  specialistConsultationPendingClaim,
  vaccinationPendingClaim,
  detailsDentalCare,
  receiptImage,
  referralLetter,
  outpatientClaimLabel,
  approvedClaim,
  verifyImageLoadedCheck,
  approvedClaimLabel,
  settlementDate,
  approvedClaimGMP,
  approvedClaimSC,
  backButton,
  startInitialPendingText,
  rejectedClaimForVaccination,
  rejectedClaimSC,
  rejectedClaimLabel,
  verifyRejectedImageLoadedCheck,
  rejectedClaimGMP,
  uniqueClaimNumber,
  submittedClaim,
  consultationType,
  selectCType,
  diagnosisText,
  selectDText,
  anotherInsureCheckbox,
  claim_amount,
  contacts
} from '../../data/claims.data';
import { screen } from '../helpers/api';
import navi from '../helpers/navi';

export function makeClaim() {
  const { type, diagnosis } = details;

  navi('Patient Details', () => _patientDetails(dependent));
  navi('Claim Details', () => _claimDetails(type, diagnosis, receiptAmount));
  navi('Add Documents', () => _addDocuments(image));
  navi('Review Claim', _reviewClaim(submitClaimButton));
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}

export function makeWellnessClaim() {
  const { type, diagnosis } = detailWellnessClaims;

  navi('Patient Details', () => _patientDetailsDep(dependent, true));

  navi('Claim Details', () =>
    _wellnessClaimDetails(
      type,
      diagnosis,
      receiptAmount,
      consultationType,
      selectCType,
      diagnosisText,
      selectDText
    )
  );
  navi('Add Documents', () => _addDocuments(image));
  navi('Review Claim', _reviewClaim(submitClaimButton));
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}
export function makeDepWellnessClaim() {
  const { type, diagnosis } = detailWellnessClaims;

  navi('Patient Details', () => _patientDetailsDep(dependent, true, false));

  navi('Claim Details', () =>
    _wellnessClaimDetails(
      type,
      diagnosis,
      receiptAmount,
      consultationType,
      selectCType,
      diagnosisText,
      selectDText
    )
  );
  navi('Add Documents', () => _addDocuments(image));
  navi('Review Claim', _reviewClaim(submitClaimButton));
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}
export function makeClaimSpecialistConsultation() {
  const { type, diagnosis } = detailsSpecialistConsultation;

  navi('Patient Details', () => _patientDetails(dependent));
  navi('Claim Details', () => _claimDetails(type, diagnosis, receiptAmount));
  navi('Add Documents', () => _addDocuments(image, true));
  navi('Review Claim', _reviewClaim(submitClaimButton));
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}

export function makeClaimDentalCare() {
  const { type, diagnosis } = detailsDentalCare;

  navi('Patient Details', () => _patientDetails(dependent));
  navi('Claim Details', () => _claimDetails(type, diagnosis, receiptAmount));
  navi('Add Documents', () => _addDocuments(image));
  navi('Review Claim', _reviewClaim(submitClaimButton));
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}

export function makeClaimWithRef() {
  const { type, diagnosis } = detailsRefer;

  navi('Patient Details', () => _patientDetails(dependent));
  navi('Claim Details', () => _claimDetails(type, diagnosis, receiptAmount));
  navi('Add Documents', () => _addDocuments(image, true));
  navi('Review Claim', _reviewClaim(submitClaimButton));
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}

export function makeClaimWithDep() {
  const { type, diagnosis } = details;

  navi('Patient Details', () => _patientDetails(dependent, true));
  navi('Claim Details', () => _claimDetails(type, diagnosis, receiptAmount));
  navi('Add Documents', () => _addDocuments(image));
  navi('Review Claim', _reviewClaim(submitClaimButton));
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}

export function makeClaimWithContact() {
  const { type, diagnosis } = details;

  navi('Patient Details', () => _patientDetails(dependent, false, true));
  navi('Claim Details', () => _claimDetails(type, diagnosis, receiptAmount));
  navi('Add Documents', () => _addDocuments(image));
  navi('Review Claim', _reviewClaim)(submitClaimButton);
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}
export function makeClaimWithDepContact() {
  const { type, diagnosis } = details;
  const { contact } = contacts;

  navi('Patient Details', () =>
    _patientDetailsDep(dependent, true, true, contact)
  );
  navi('Claim Details', () => _claimDetails(type, diagnosis, receiptAmount));
  navi('Add Documents', () => _addDocuments(image));

  navi('Review Claim', _reviewClaim(submitClaimButton));

  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}
export function makeClaimSpecialistConsultationDep() {
  const { type, diagnosis } = detailsSpecialistConsultation;

  navi('Patient Details', () => _patientDetailsDep(dependent, true, false));
  navi('Claim Details', () =>
    _anotherInsure(
      type,
      diagnosis,
      receiptAmount,
      anotherInsureCheckbox,
      claim_amount,
      claimAmount
    )
  );

  navi('Add Documents', () => _addDocuments(image, true));

  navi('Review Claim', _reviewClaim(submitClaimButton));
  navi('Terms & Conditions', _termsConditions);

  return screen('Claim submitted');
}

export function viewSubmittedClaims() {
  _viewSubmittedClaims(viewSubmittedClaim);
}
export function clickPendingClaims() {
  _clickPendingClaims(gmpPendingClaim);
}

export function reimbursedAmount() {
  return _reimbursedAmount(isReimbursedAmountVisible);
}

export function getSettlementDate() {
  return _getSettlementDate(settlementDate);
}

export function loadedImage() {
  return _checkLoadedImageOnPendingClaims(pendingClaimLoadedImage);
}

export function clickSpecialistConsultationPendingClaims() {
  _clickPendingClaims(specialistConsultationPendingClaim);
}

export function clickVaccinationPendingClaims() {
  _clickPendingClaims(vaccinationPendingClaim);
}

export function receiptImages() {
  return _receiptImage(receiptImage);
}

export function referralLetters() {
  return _referralLetter(receiptImage, referralLetter);
}

export function outpatientClaimLables() {
  return _outpatientClaimLabel(outpatientClaimLabel);
}

export function checkAndClickApprovedClaimsForVaccination() {
  return _approvedClaims(approvedClaim);
}

export function verifyLoadedImageCheck() {
  return _checkLoadedImageOnApprovedClaims(verifyImageLoadedCheck);
}

export function approvedClaimLables() {
  return _outpatientClaimLabel(approvedClaimLabel);
}

export function checkAndClickApprovedClaimsForGeneralMedicalPractitioner() {
  return _approvedClaims(approvedClaimGMP);
}

export function checkAndClickApprovedClaimsForSpecialistConsultation() {
  return _approvedClaims(approvedClaimSC);
}

export function clickBackButton() {
  return _backButton(backButton);
}

export function startFromIntial() {
  return _startFromIntial(startInitialPendingText);
}

export function checkAndClickRejectedClaimsForVaccination() {
  return _rejectedClaims(rejectedClaimForVaccination);
}

export function checkAndClickRejectedClaimsForSpecialistConsultation() {
  return _rejectedClaims(rejectedClaimSC);
}

export function rejectedClaimLables() {
  return _outpatientClaimLabel(rejectedClaimLabel);
}

export function verifyRejectedLoadedImageCheck() {
  return _checkLoadedImageOnApprovedClaims(verifyRejectedImageLoadedCheck);
}
export function checkAndClickRejectedClaimsForGeneralMedicalPractitioner() {
  return _rejectedClaims(rejectedClaimGMP);
}
export function claimSubmittedIsDisplay() {
  return _claimSubmittedIsDisplay(submittedClaim);
}
export function uniqueClaimNumberIsDisplay() {
  return _uniqueClaimNumberIsDisplay(uniqueClaimNumber);
}
