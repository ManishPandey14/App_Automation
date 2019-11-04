import { loginAs } from '../actions/login.action';
import {
  landingCredentials,
  validCredentials,
  sixGraph,
  oneGraph,
  validCredentials2
} from '../../data/login.data';
import { updateHealthData, clinic, area } from '../../data/health.data';

import { platform as getPlatform } from '../helpers/api';
import * as healthAction from '../actions/health.action';

fdescribe('User should be able to: ', () => {
  beforeAll(() => {});

  afterEach(() => {
    driver.reset();
  });

  // [jprmerginio] to be enabled once pipeline is available
  // Story #4: Displaying of the health landing page
  it('see the health landing page before any health data is provided', () => {
    loginAs(landingCredentials);
    expect(healthAction.isLandingHealthPageDisplayed()).toBeTruthy();
    expect(healthAction.isLifeStyleTabSelected).toBeTruthy();
    expect(healthAction.isAddMyHealthDataButtonDisplayed()).toBeTruthy();
    expect(healthAction.isSearchForClinicButtonDisplayed()).toBeTruthy();
  });

  // Story #22: Displaying of BMI and Prediabetes results
  // Story #31: Upload photo from mobile gallery for face aging
  // [update this section for] Story #90: Update script to add additional health results (prediabetes, etc.)
  it('update BMI, prediabetes, and upload a valid photo, afterwards, verify the result', () => {
    healthAction.copyImageToLibrary();
    loginAs(validCredentials2);

    //#90: Update script to add additional health results (prediabetes, etc.)
    //#107 Update health script based on the new health questionnaires
    healthAction.clickUpdateHealthDataButton();
    healthAction.updateHealthAs(updateHealthData);
    expect(healthAction.isUpdateLifestyleButton()).toBeTruthy();
    expect(healthAction.getTextBmiHeader()).toBeTruthy();
    expect(healthAction.getTextBmiScore()).toBeTruthy();
    expect(healthAction.getTextBmiStatus()).toBeTruthy();
    expect(healthAction.getTextBmiStatement()).toBeTruthy();
    expect(healthAction.getTextDiabetesHeader()).toBeTruthy();
    expect(healthAction.getTextDiabetesScore()).toBeTruthy();
    expect(healthAction.getTextDiabetesStatus()).toBeTruthy();
    expect(healthAction.getTextDiabetesStatement()).toBeTruthy();
    //#31: Upload photo from mobile gallery for face aging
    healthAction.addImage();
    expect(healthAction.isPhotoExistingOnLifestylePage()).toBeTruthy();
    //#32: Face aging slider
    // verify future you at the age of 35
    expect(healthAction.isFutureYouAtTheAgeOf('35')).toBeTruthy();
    healthAction.slideFaceAging(0, 0.25);
    // verify future you at the age of 45
    expect(healthAction.isFutureYouAtTheAgeOf('45')).toBeTruthy();
    healthAction.slideFaceAging(0.25, 0.5);
    // verify future you at the age of 55
    expect(healthAction.isFutureYouAtTheAgeOf('55')).toBeTruthy();
    healthAction.slideFaceAging(0.5, 0.75);
    // verify future you at the age of 67
    expect(healthAction.isFutureYouAtTheAgeOf('67')).toBeTruthy();
    healthAction.slideFaceAging(0.75, 1);
    // verify future you at the age of 75
    expect(healthAction.isFutureYouAtTheAgeOf('75')).toBeTruthy();
    // #36: View panel search page - accept location access
    healthAction.clickSearchForClinicButton();
    healthAction.allowAccessLocation(); // allow location access
    expect(healthAction.isHealthMapsPageDisplayed()).toBeTruthy(); // map displayed based on your users location
    //#65: Search functionality via Near Me on map view
    healthAction.clickOnSearchClinic();
    healthAction.clickOnNearByButton();
    //    expect(healthAction.isClinicDisplayed()).toBeFalsy();
    //#67: Search functionality via Show all clinics on map view
    healthAction.clickOnSearchClinic();
    healthAction.clickOnShowAllClinic();
    expect(healthAction.isClinicDisplayed()).toBeTruthy();
    //#75: Search functionality via area on map view
    healthAction.clickOnSearchClinic();
    healthAction.clickOnAreasLabel();
    healthAction.clickOnFirstAreasInList(); // click on the first area in the list
    expect(healthAction.isClinicDisplayed()).toBeTruthy();
    //#83: Search functionality via district on map view
    healthAction.clickOnSearchClinic();
    healthAction.clickOnRecentSearchesLabel();
    healthAction.clickOnFirstDistrictInList();
    expect(healthAction.isClinicDisplayed()).toBeTruthy();
    //#47: Display clinic details on map view
    healthAction.clickOnSearchClinic();
    healthAction.searchForClinic(clinic.Name); // search for a clinic
    expect(healthAction.isClinicDisplayed()).toBeTruthy(); // clinic is displayed
    healthAction.clickOnClinic(clinic.Name);
    expect(healthAction.isClinicDetailPageDisplayed()).toBeTruthy(); // clinic details displayed on map view
    healthAction.clickOnBackArrow();
    //#86: Story: Search functionality via input on map view
    healthAction.clickOnSearchClinic();
    healthAction.typeClinicToSearch(area.Clinic);
    expect(healthAction.isClinicDisplayed()).toBeTruthy();
    healthAction.typeClinicToSearch('invalid clinic');
    expect(healthAction.isNoClinicAvailableDisplayed()).toBeTruthy();
    //#74: Search functionality via Show all clinics on list view
    healthAction.clickOnListTab();
    healthAction.clickOnSearchClinic();
    healthAction.clickOnShowAllClinic();
    expect(healthAction.isClinicsFound()).toBeTruthy();
    //#76: Search functionality via area on list view
    healthAction.clickOnSearchClinic();
    healthAction.clickOnRecentSearchesLabel();
    healthAction.clickOnFirstAreasInList();
    expect(healthAction.isClinicsFound()).toBeTruthy(); // display record for Dr. Kwan Siu Kuen Billy
    //#87: Story: Search functionality via input on list view
    healthAction.clickOnSearchClinic();
    healthAction.typeClinicToSearch(area.Clinic);
    expect(healthAction.isClinicsFound()).toBeTruthy();
    healthAction.typeClinicToSearch('invalid clinic');
    expect(healthAction.isNoClinicAvailableDisplayed()).toBeTruthy();
    //#72: Search functionality via Near me on list view
    healthAction.clickOnListTab();
    healthAction.clickOnSearchClinic();
    healthAction.clickOnNearByButton();
    //    expect(healthAction.isNoClinicAvailableDisplayed()).toBeTruthy();
    //#84: Search functionality via district on list view
    healthAction.clickOnSearchClinic();
    healthAction.clickOnRecentSearchesLabel();
    healthAction.clickOnFirstDistrictInList();
    expect(healthAction.isClinicsFound()).toBeTruthy(); // display record for Dr. Kwan Siu Kuen Billy
    //#49: Directions functionality on map view
    healthAction.clickOnMapTab();
    healthAction.clickOnDirectionButton();
    expect(healthAction.isDirectionPageDisplayed()).toBeTruthy();
    const platform = getPlatform();
    if (platform === 'ios') {
      driver.execute('mobile: activateApp', {
        bundleId: 'com.cxagroup.mobile.EmployeePortal.development'
      });
    }
    if (platform === 'android') {
      //#48: Call functionality on map view
      driver.back();
      healthAction.clickOnCallButton();
      expect(healthAction.isCallPageDisplayed()).toBeTruthy(); // phones native call functionality is executed
      //#53: Call functionality on additional clinic information
      driver.back();
      driver.back();
      healthAction.searchForClinic(clinic.Name);
      healthAction.clickOnClinic(clinic.Name);
      healthAction.clickOnCallButtonOnDetailsPage(clinic.Number);
      expect(healthAction.isCallPageDisplayed()).toBeTruthy(); // phones native call functionality is executed
      driver.back();
      driver.back();
      healthAction.clickOnBackArrow();
    }
    //#54: Directions functionality on additional clinic information (map view)
    healthAction.searchForClinic(clinic.Name);
    healthAction.clickOnClinic(clinic.Name);
    healthAction.clickOnDirectionsButtonOnDetailsPage(clinic.Directions);
    expect(healthAction.isDirectionPageDisplayed()).toBeTruthy(); // directions is displayed using google map
  });

  // Story #38: View bar graph risk score
  // QA Notes: not in scope, verifying the actual risk score in the bar graph
  it('view the bar graph risk scores', () => {
    const platform = getPlatform();

    if (platform === 'ios') {
      loginAs(sixGraph); // Pre-condition: Login as account with six graphs
      expect(healthAction.isBarGraphRiskDisplay()).toBeTruthy();
      expect(healthAction.countBarGraph()).toBe(6);

      driver.reset();

      loginAs(oneGraph); // Pre-condition: Login as account with only one graph
      expect(healthAction.isBarGraphRiskDisplay()).toBeTruthy();
      expect(healthAction.countBarGraph()).toBe(6);
    }
  });

  // Story #37: View graphical risk score
  // QA Notes: not in scope, verifying the graphical risk score color
  it('view the graphical risk score', () => {
    const platform = getPlatform();

    if (platform === 'ios') {
      loginAs(sixGraph);

      expect(healthAction.isGraphicHistoryScoreDisplay()).toBeTruthy();
      const graphicRiskNumber = healthAction.getGraphicRiskNumber();
      const actualHealthScoreBar = healthAction.getScoreOfLastBarOfGraphicRiskScore();
      expect(actualHealthScoreBar).toBe(graphicRiskNumber);
    }
  });

  // Story #34: View panel search page - deny location access
  // QA Notes: This will always be tested last
  it('deny access of location but panel search page is still displayed on default view', () => {
    loginAs(validCredentials);
    healthAction.clickSearchForClinicButton();
    healthAction.denyAccessLocation(); // deny location access
    expect(healthAction.isHealthMapsPageDisplayed()).toBeTruthy(); // default map (HongKong) is displayed
  });
});
