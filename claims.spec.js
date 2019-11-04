import {
  isNavigationBarVisible,
  navigateToClaimsScreen
} from '../actions/navigator.action';
import * as claims from '../actions/claims.action';
import { loginAs } from '../actions/login.action';
import { CLAIMS as SELECTOR } from '../selectors';
import { validCredentials2, validCredentials } from '../../data/login.data';

fdescribe('Claims Submission:', () => {
  beforeAll(() => {
    loginAs(validCredentials);
    isNavigationBarVisible();
    navigateToClaimsScreen();
  });

  beforeEach(() => {
    $(SELECTOR.buttonMakeAClaim).click();
  });

  // add the landing page script here

  fit('submit an outpatient claim for employee without referral letter', () => {
    // with 1 receipt
    // Employee: General Medical Practitioner / Abscess
    expect(claims.makeClaim()).toBeTruthy();
    expect(claims.claimSubmittedIsDisplay()).toBeTruthy();
    expect(claims.uniqueClaimNumberIsDisplay()).toBeTruthy();
  });

  // Skipping this test as this consultation type is not in scope
  it('submit an outpatient claim for employee with referral letter', () => {
    expect(claims.makeClaimWithRef()).toBeTruthy();
    expect(claims.claimSubmittedIsDisplay()).toBeTruthy();
    expect(claims.uniqueClaimNumberIsDisplay()).toBeTruthy();
  });

  // will be enabled once a wellness claim has been added
  it('submit a wellness claim for dependant', () => {
    // Dependant: Dental Care / Back Pain
    expect(claims.makeDepWellnessClaim()).toBeTruthy();
    expect(claims.claimSubmittedIsDisplay()).toBeTruthy();
    expect(claims.uniqueClaimNumberIsDisplay()).toBeTruthy();
  });

  afterEach(() => {
    claims.viewSubmittedClaims();
  });
  afterAll(() => {
    driver.reset();
  });
});

fdescribe('Verification of claims submitted:', () => {
  beforeAll(() => {
    loginAs(validCredentials2);
    isNavigationBarVisible();
    navigateToClaimsScreen();
  });

  fit('pending outpatient claim for employee without referral letter', () => {
    expect(claims.loadedImage()).toBeTruthy();
    claims.clickPendingClaims();
    expect(claims.reimbursedAmount()).toBeFalsy();
    expect(claims.getSettlementDate()).toBeFalsy();
  });

  fit('approved outpatient claim for employee with referral letter', () => {
    claims.checkAndClickApprovedClaimsForSpecialistConsultation();
    expect(claims.verifyLoadedImageCheck()).toBeTruthy();
    expect(claims.approvedClaimLables()).toEqual('Outpatient claim');
    expect(claims.reimbursedAmount()).toBeTruthy();
    expect(claims.getSettlementDate()).toBeTruthy();
    expect(claims.receiptImages()).toBeTruthy();
  });

  it('rejected wellness claim for employee', () => {
    claims.checkAndClickRejectedClaimsForVaccination();
    expect(claims.verifyRejectedLoadedImageCheck()).toBeTruthy();
    expect(claims.rejectedClaimLables()).toEqual('Wellness claim');
    expect(claims.reimbursedAmount()).toBeFalsy();
    expect(claims.getSettlementDate()).toBeTruthy();
    expect(claims.receiptImages()).toBeTruthy();
  });

  // it('approved wellness claim for dependant', () => {
  // });

  afterEach(() => {
    claims.clickBackButton();
    claims.startFromIntial();
  });
});
