import { loginAs } from '../actions/login.action';
import {
  landingCredentials,
  validCredentials,
  sixGraph,
  oneGraph,
  validCredentials2,
  greenRisk
} from '../../data/login.data';
import { updateHealthData, clinic, area } from '../../data/health.data';

import { platform as getPlatform } from '../helpers/api';

import * as healthAction from '../actions/health.action';
// import { SSL_OP_EPHEMERAL_RSA } from 'constants';

fdescribe('Employee should,', () => {
  beforeAll(() => {});

  afterEach(() => {
    //driver.reset();
  });

  it('Story #4: Displaying of the health landing page', () => {
    // Pre-con. Log in as landing credentials account
    loginAs(landingCredentials);

    // VP1. Health landing page is displayed
    expect(healthAction.isLandingHealthPageDisplayed()).toBeTruthy();
    expect(healthAction.isLifeStyleTabSelected).toBeTruthy();
    // VP2. "Enter Health Data" and "Search for clinics" button is displayed
    expect(healthAction.isAddMyHealthDataButtonDisplayed()).toBeTruthy();
    expect(healthAction.isSearchForClinicButtonDisplayed()).toBeTruthy();
  });

  it('Story #22: Displaying of BMI and Prediabetes results', () => {
    // Pre-con. Log in
    loginAs(validCredentials2);

    // Step 1. Click update my health data button
    healthAction.clickUpdateHealthDataButton();

    // Step 2. Input data and click next
    healthAction.updateHealthAs(updateHealthData);

    //VP1. Verify BMI header displays.
    expect(healthAction.getTextBmiHeader()).toBeTruthy();

    //VP2. Verify BMI Risk score displays.
    expect(healthAction.getTextBmiScore()).toBeTruthy();

    //VP3. Verify BMI Risk status displays.
    expect(healthAction.getTextBmiStatus()).toBeTruthy();

    //VP4. Verify BMI Risk statement displays.
    expect(healthAction.getTextBmiStatement()).toBeTruthy();

    // Pending: Because currently, we only care about height and weight so I pending verify these
    /*
    // VP2. Verify Diabetes info is correctly
    expect(
      healthAction.isDiabeteDisplayCorrectly(
        expectResultHealthData.DiabeteStatus,
        expectResultHealthData.DiabeteStatement
      )
    ).toBeTruthy();
    // VP3. Verify Alcohol info is correctly
    expect(
      expectResultHealthData.AlcoholAssessment,
      expectResultHealthData.AlcoholStatement
    ).toBeTruthy();
    // VP4. Verify Tobacco info is correctly
    expect(
      healthAction.isTobaccoDisplayCorrectly(
        expectResultHealthData.TobaccoAssessment,
        expectResultHealthData.TobaccoStatement
      )
    ).toBeTruthy();
    // VP5. Verify Exercise info is correctly
    expect(
      healthAction.isExerciseDisplayCorrectly(
        expectResultHealthData.ExerciseAssessment,
        expectResultHealthData.ExerciseStatement
      )
    ).toBeTruthy();
    // VP6. Verify Nutrition info is correctly
    expect(
      healthAction.isNutritionDisplayCorrectly(
        expectResultHealthData.NutritionAssessment,
        expectResultHealthData.NutritionStatement
      )
    ).toBeTruthy();
    // VP7. Verify Sleep info is correctly
    expect(
      healthAction.isSleepDisplayCorrectly(
        expectResultHealthData.SleepAssessment,
        expectResultHealthData.SleepStatement
      )
    ).toBeTruthy();
    // VP8. Verify Mental info is correctly
    expect(
      expectResultHealthData.MentalAssessment,
      expectResultHealthData.MentalStatement
    ).toBeTruthy();
    */
  });

  it('Story #31: Upload photo from mobile gallery for face aging', () => {
    // Pre-con 0. Copy image to iOS
    healthAction.copyImageToLibrary();

    // Pre-con 1. Log in as landing credentials account
    loginAs(validCredentials);

    // Pre-con 2. Click Add my health data button
    healthAction.clickAddMyHealthDataButton();

    // Pre-con 3. Remove photo (if have)
    healthAction.removePhoto();

    // Step 3. Select photo (if have)
    healthAction.selectPhoto();

    // VP1. Verify taken photo displays on Update page
    expect(healthAction.isPhotoExistingOnUpdatePage()).toBeTruthy();

    // Step 4. Click Next
    healthAction.clickNextButton();

    //VP2. Verify taken photo displays on Health page
    expect(healthAction.isPhotoExistingOnLifestylePage()).toBeTruthy();
  });

  fit('Story #32: Face aging slider', () => {
    // Pre-con 0. Copy image to iOS
    healthAction.copyImageToLibrary();

    // Pre-con 1. Log in as landing credentials account
    loginAs(validCredentials);

    // Pre-con 2. Click update my health data button
    healthAction.clickAddMyHealthDataButton();

    // Pre-con 3. Remove photo (if have)
    healthAction.removePhoto();

    // Step 3. Select photo (if have)
    healthAction.selectPhoto();

    // VP1. Verify taken photo displays on Update page
    expect(healthAction.isPhotoExistingOnUpdatePage()).toBeTruthy();

    // Step 4. Click Next
    healthAction.clickNextButton();

    // VP2. Verify selected photo displays on Health page
    expect(healthAction.isPhotoExistingOnLifestylePage()).toBeTruthy();

    // VP3. Verify future you at the age display of 35
    expect(healthAction.isFutureYouAtTheAgeOf('35')).toBeTruthy();

    // Step 5. Slide face aging to 25%
    healthAction.slideFaceAging(0, 0.25);

    // VP4. Verify future you at the age display of 45
    expect(healthAction.isFutureYouAtTheAgeOf('45')).toBeTruthy();

    // Step 6. Slide face aging to 50%
    healthAction.slideFaceAging(0.25, 0.5);

    // VP5. Verify future you at the age display of 55
    expect(healthAction.isFutureYouAtTheAgeOf('55')).toBeTruthy();

    // Step 7. Slide face aging to 75%
    healthAction.slideFaceAging(0.5, 0.75);

    // VP6. Verify future you at the age display of 67
    expect(healthAction.isFutureYouAtTheAgeOf('67')).toBeTruthy();

    // Step 8. Slide face aging to 100%
    healthAction.slideFaceAging(0.75, 1);

    // VP7. Verify future you at the age display of 75
    expect(healthAction.isFutureYouAtTheAgeOf('75')).toBeTruthy();
  });

  it('Story #34: View panel search page - deny location access', () => {
    // Pre-con 1. Log in as landing credentials account
    loginAs(validCredentials);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Deny access location
    healthAction.denyAccessLocation();

    // VP1. Map is loaded
    expect(healthAction.isHealthMapsPageDisplayed()).toBeTruthy();
  });

  it('Story #36: View panel search page - accept location access', () => {
    // Pre-con 1. Log in as landing credentials account
    loginAs(validCredentials);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Deny access location
    healthAction.allowAccessLocation();

    // VP1. Map is loaded
    expect(healthAction.isHealthMapsPageDisplayed()).toBeTruthy();
  });

  it('Story #37: View graphical risk score', () => {
    const platform = getPlatform();

    if (platform === 'ios') {
      // Notice: Block. Wait for dev to add element contains the color of graphical for verifying the change of color when risk score changes
      // Pre-con 1. Log in as landing credentials account
      loginAs(greenRisk);

      // VP1. Verify graphical risk score displays
      expect(healthAction.isGraphicHistoryScoreDisplay()).toBeTruthy();

      // Unable to verify this point on Android
      // VP2. Verify graphical risk score equals to bar graph score selected
      const graphicRiskNumber = healthAction.getGraphicRiskNumber();
      const actualHealthScoreBar = healthAction.getScoreOfLastBarOfGraphicRiskScore();

      expect(actualHealthScoreBar).toBe(graphicRiskNumber);
    }
  });

  it('Story #38: View bar graph risk score', () => {
    const platform = getPlatform();

    if (platform === 'ios') {
      // Pre-con 1. Log in as account has six graph
      loginAs(sixGraph);

      // VP1. Verify bar graph risk score displays
      expect(healthAction.isBarGraphRiskDisplay()).toBeTruthy();

      // VP2. Verify bar graph has 6 bars
      expect(healthAction.countBarGraph()).toBe(6);

      // Notice: Currently, we cannot verify the score on the top of bar
      // Logout
      driver.reset();

      // Pre-con 1. Log in as account has one graph
      loginAs(oneGraph);

      // VP1. Verify bar graph risk score displays
      expect(healthAction.isBarGraphRiskDisplay()).toBeTruthy();

      // VP2. Verify bar graph has 6 bars
      expect(healthAction.countBarGraph()).toBe(1);
    }
  });

  it('Story #47: Display clinic details on map view', () => {
    // Pre-con 1. Log in as landing credentials account
    loginAs(validCredentials);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Allow access location and search for clinic
    healthAction.searchForClinic(clinic.Name);

    // VP1. Clinic is displayed
    expect(healthAction.isClinicDisplayeWithName(clinic.Name)).toBeTruthy();

    // Step 4. Click on clinic
    healthAction.clickOnClinic(clinic.Name);

    // VP2. Clinic detail info is displayed
    expect(healthAction.isClinicDetailPageDisplayed()).toBeTruthy();
  });

  it('Story #48: Call functionality on map view', () => {
    const platform = getPlatform();

    if (platform === 'android') {
      // Pre-con 1. Log in as landing credentials account
      loginAs(validCredentials);

      // Step 1. Click Search for clinic button
      healthAction.clickSearchForClinicButton();

      // Step 2. Allow access location and search for clinic
      healthAction.allowAccessLocation();

      // Step 3. Click on Call button
      healthAction.clickOnCallButton();

      // Notice: In iOS, the call functionality alert only happens in list view or when user clicks the clinic and is in the additional clinic information page
      // VP1. Android will redirect the user to a call page which is also a native behaviour
      expect(healthAction.isCallPageDisplayed()).toBeTruthy();
    }
  });

  it('Story #49: Directions functionality on map view', () => {
    // Pre-con 1. Log in as landing credentials account
    loginAs(validCredentials);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Click on Directions button
    healthAction.clickOnDirectionButton();

    // VP1. Google maps will open and suggest the directions going to the clinic
    expect(healthAction.isDirectionPageDisplayed()).toBeTruthy();
  });

  it('Story #53: Call functionality on additional clinic information', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Allow access location and search for clinic
    healthAction.searchForClinic(clinic.Name);

    // Step 4. Click on clinic
    healthAction.clickOnClinic(clinic.Name);

    // Step 5. Click on Call button
    healthAction.clickOnCallButtonOnDetailsPage(clinic.Number);

    // VP1. iOS will display an alert call function which is a native behaviour
    // VP1. Android will redirect the user to a call page which is also a native behaviour
    expect(healthAction.isCallPageDisplayed()).toBeTruthy();
  });

  it('Story #54: Directions functionality on additional clinic information (map view)', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Allow access location and search for clinic
    healthAction.searchForClinic(clinic.Name);

    // Step 4. Click on clinic
    healthAction.clickOnClinic(clinic.Name);

    // Step 5. Click on Direction button
    healthAction.clickOnDirectionsButtonOnDetailsPage(clinic.Directions);

    // VP1. Google maps will open and suggest the directions going to the clinic
    expect(healthAction.isDirectionPageDisplayed()).toBeTruthy();
  });

  it('Story #65: Search functionality via Near Me on map view', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 4. Click on Near Me
    healthAction.clickOnNearByButton();

    // VP1. Verify clinic is changed
    expect(healthAction.isDefaultClinicDisplayed()).toBeFalsy();
  });

  it('Story #67: Search functionality via Show all clinics on map view', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 4. Click on Show All Clinic
    healthAction.clickOnShowAllClinic();

    // VP1. Verify clinic is changed
    expect(healthAction.isClinicDisplayeWithName()).toBeTruthy();
  });

  it('Story #72: Search functionality via Near me on list view', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Click on List tab
    healthAction.clickOnListTab();

    // Step 4. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 5. Click on Near Me
    healthAction.clickOnNearByButton();

    // VP 1. Near Me button work fine
    expect(healthAction.isNearMeOnListViewWorkFine()).toBeTruthy();
  });

  it('Story #74: Search functionality via Show all clinics on list view', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Click on List tab
    healthAction.clickOnListTab();

    // Step 4. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 5. Click on Near Me
    healthAction.clickOnShowAllClinic();

    // VP 1. Near Me button work fine
    expect(healthAction.isClinicsFound()).toBeTruthy();
  });

  it('Story #75: Search functionality via area on map view', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 4. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 5. Click on Areas to make keyboard invisible
    healthAction.clickOnAreasLabel();

    // Step 6. Click on New Territories
    healthAction.clickOnFirstAreasInList();

    // VP1. Verify display clinic on map view
    expect(healthAction.isClinicDisplayed()).toBeTruthy();
  });

  it('Story #76: Search functionality via area on list view', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Click on List tab
    healthAction.clickOnListTab();

    // Step 4. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 5. Click on Areas to make keyboard invisible
    healthAction.clickOnAreasLabel();

    // Step 6. Click on New Territories
    healthAction.clickOnFirstAreasInList();

    // VP1. Verify display Dr. Kwan Siu Kuen Billy
    expect(healthAction.isClinicsFound()).toBeTruthy();
  });

  it('Story #83: Search functionality via district on map view', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 4. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 5. Click on Areas to make keyboard invisible
    healthAction.clickOnAreasLabel();

    // Step 6. Click on District
    healthAction.clickOnFirstDistrictInList();

    // VP1. Verify display Dr. Kwan Siu Kuen Billy
    expect(healthAction.isClinicDisplayed()).toBeTruthy();
  });

  it('Story #84: Search functionality via district on list view', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Click on List tab
    healthAction.clickOnListTab();

    // Step 4. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 5. Click on Areas to make keyboard invisible
    healthAction.clickOnAreasLabel();

    // Step 6. Click on District
    healthAction.clickOnFirstDistrictInList();

    // VP1. Verify display Dr. Kwan Siu Kuen Billy
    expect(healthAction.isClinicsFound()).toBeTruthy();
  });

  it('Story #87: Search functionality via input on list view', () => {
    const platform = getPlatform();

    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 3. Click on List tab
    healthAction.clickOnListTab();

    // Step 4. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 5. Type Dr. Kwan Siu Kuen Billy  in search textbox
    healthAction.typeClinicToSearch(area.Clinic);

    // VP1. Verify display Dr. Kwan Siu Kuen Billy
    expect(healthAction.isClinicsFound()).toBeTruthy();

    if (platform === 'android') {
      healthAction.clickOnBackArrow();
      // Step 1. Click Search for clinic button
      healthAction.clickSearchForClinicButton();

      // Step 2. Allow access location and search for clinic
      healthAction.allowAccessLocation();

      // Step 3. Click on List tab
      healthAction.clickOnListTab();

      // Step 4. Click on Search
      healthAction.clickOnSearchClinic();
    }
    // Step 6. Type Dr. Kwan Siu Kuen Billy  in search textbox
    healthAction.typeClinicToSearch('invalid clinic');

    // VP1. Verify display Dr. Kwan Siu Kuen Billy
    expect(healthAction.isNoClinicAvailableDisplayed()).toBeTruthy();
  });

  it('Story #86: Search functionality via input on map view', () => {
    const platform = getPlatform();
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    // Step 1. Click Search for clinic button
    healthAction.clickSearchForClinicButton();

    // Step 2. Allow access location and search for clinic
    healthAction.allowAccessLocation();

    // Step 4. Click on Search
    healthAction.clickOnSearchClinic();

    // Step 4. Type Dr. Kwan Siu Kuen Billy  in search textbox
    healthAction.typeClinicToSearch(area.Clinic);

    // VP1. Verify display Dr. Kwan Siu Kuen Billy
    expect(healthAction.isClinicDisplayed()).toBeTruthy();

    if (platform === 'android') {
      healthAction.clickOnBackArrow();
      // Step 1. Click Search for clinic button
      healthAction.clickSearchForClinicButton();

      // Step 2. Allow access location and search for clinic
      healthAction.allowAccessLocation();

      // Step 3. Click on Search
      healthAction.clickOnSearchClinic();
    }

    // Step 5. Type Invalid clinic  in search textbox
    healthAction.typeClinicToSearch('invalid clinic');

    // VP1. Verify display Dr. Kwan Siu Kuen Billy
    expect(healthAction.isNoClinicAvailableDisplayed()).toBeTruthy();
  });

  it('Story #90: Update script to add additional health results (prediabetes, etc.)', () => {
    // Pre-con 1. Log in as test3 credentials account
    loginAs(validCredentials2);

    //VP1. Verify BMI header displays.
    expect(healthAction.getTextBmiHeader()).toBeTruthy();

    //VP2. Verify BMI Risk score displays.
    expect(healthAction.getTextBmiScore()).toBeTruthy();

    //VP3. Verify BMI Risk status displays.
    expect(healthAction.getTextBmiStatus()).toBeTruthy();

    //VP4. Verify BMI Risk statement displays.
    expect(healthAction.getTextBmiStatement()).toBeTruthy();

    //VP5. Verify DIABETES header displays.
    expect(healthAction.getTextDiabetesHeader()).toBeTruthy();

    //VP6. Verify DIABETES Risk score displays.
    expect(healthAction.getTextDiabetesScore()).toBeTruthy();

    //VP7. Verify DIABETES Risk status displays.
    expect(healthAction.getTextDiabetesStatus()).toBeTruthy();

    //VP8. Verify DIABETES Risk statement displays.
    expect(healthAction.getTextDiabetesStatement()).toBeTruthy();
  });
});