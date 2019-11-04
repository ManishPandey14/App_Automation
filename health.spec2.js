import { loginAs } from '../actions/login.action';
import { validCredentials2, sixGraph, oneGraph } from '../../data/login.data';
import { updateHealthData,area, clinic } from '../../data/health.data';
import * as healthAction from '../actions/health.action';
import { platform as getPlatform } from '../helpers/api';

fdescribe('Employee should:', () => {
  beforeAll(() => {});

  afterEach(() => {
    driver.reset();
  });

  // add login here for health questionnaires and panel search
  // answering of health questionnaires
  fit('be able to answer questions and get health results', () => {
    // Pre-con. Log in as landing credentials account
    loginAs(validCredentials2);

    //   Click on "update my life style data" button
    healthAction.clickUpdateHealthDataButton();
    //    // Step 2. Input health related data
    healthAction.updateHealthAs(updateHealthData);
    expect(healthAction.isUpdateLifestyleButton()).toBeTruthy();
    expect(healthAction.getTextBmiHeader()).toBeTruthy();
    expect(healthAction.getTextBmiScore()).toBeTruthy();
    expect(healthAction.getTextBmiStatus()).toBeTruthy();
    expect(healthAction.getTextBmiStatement()).toBeTruthy();
    expect(healthAction.getTextDiabetesHeader()).toBeTruthy();
    expect(healthAction.getTextDiabetesStatus()).toBeTruthy();
    expect(healthAction.getTextDiabetesStatement()).toBeTruthy();
    expect(healthAction.isPhotoExistingOnLifestylePage()).toBeTruthy();
    //#32: Face aging slider
    // verify future you at the age of 35
    expect(healthAction.isFutureYouAtTheAgeOf('Me at age 35')).toBeTruthy();
    healthAction.slideFaceAging(0, 0.25);
    // verify future you at the age of 45
    expect(healthAction.isFutureYouAtTheAgeOf('Me at age 45')).toBeTruthy();
    healthAction.slideFaceAging(0.25, 0.5);
    // verify future you at the age of 55
    expect(healthAction.isFutureYouAtTheAgeOf('Me at age 55')).toBeTruthy();
    healthAction.slideFaceAging(0.5, 0.75);
    // verify future you at the age of 67
    expect(healthAction.isFutureYouAtTheAgeOf('Me at age 67')).toBeTruthy();
    healthAction.slideFaceAging(0.75, 1);
    // verify future you at the age of 75
    expect(healthAction.isFutureYouAtTheAgeOf('Me at age 75')).toBeTruthy();
    /*//Commented due to issue.
    //Story #30: Take photo via camera on mobile for face aging
    // Step 1. Employee clicks "Take Photo"
    healthAction.employeeTakePhoto();
     //VP1: Employee takes photo and confirms the shot
    expect(healthAction.isPhotoExistingOnUpdatePage()).toBeTruthy();
    //step 2: Employee clicks Next button
    healthAction.clickNextButton();
    //VP1. employee is redirected to the Health result page. Healthy and current lifestyle photo taken are displayed..
    expect(healthAction.isPhotoExistingOnLifestylePage()).toBeTruthy();*/
  });

  // panel search
  it('be able to search for a panel doctor', () => {
    // Pre-con. Log in as landing credentials account
    loginAs(validCredentials2);
    // #36: View panel search page - accept location access
    healthAction.clickSearchForClinicButton();
    healthAction.allowAccessLocation(); // allow location access
    expect(healthAction.isHealthMapsPageDisplayed()).toBeTruthy(); // map displayed based on your users location
    //#65: Search functionality via Near Me on map view
    healthAction.clickOnSearchClinic();
    healthAction.clickOnNearByButton();
    //expect(healthAction.isClinicDisplayed()).toBeFalsy();
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
    if (platform === 'ios') {
      driver.execute('mobile: activateApp', {
        bundleId: 'com.cxagroup.mobile.EmployeePortal.development'
      });
    }
    healthAction.clickOnBackArrow();
    //VP1. Form should be submitted and redirected to home page and "update my life style data" button should be visible.
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
    //    healthAction.clickOnRecentSearchesLabel();
    healthAction.clickOnFirstDistrictInList();
    expect(healthAction.isClinicsFound()).toBeTruthy(); // display record for Dr. Kwan Siu Kuen Billy
    healthAction.clickOnMapTab();
    //Story #130: Verify last four searches on recent searches
    //VP1. Verify Health Map page is displayed.
    expect(healthAction.isHealthMapsPageDisplayed()).toBeTruthy();
    //step2. Search "Hong Kong Island "
    healthAction.clickOnSearchClinic();
    healthAction.typeClinicToSearch('New Territories');
    //step3. Search "Kowloon"
    healthAction.clickOnSearchClinic();
    healthAction.isRecentSearchesHeaderDisplay();
    healthAction.clickOnRecentSearchesLabel();
    expect(healthAction.isRecentSearchesDisplayed('1')).toEqual(
      'New Territories'
    );
    healthAction.typeClinicToSearch('Kowloon');

    //step4. Search for "Outlying Islands(Area)"
    healthAction.clickOnSearchClinic();
    healthAction.typeClinicToSearch('Outlying Islands');

    //step5. Search for "Aberdeen(District)"
    healthAction.clickOnSearchClinic();
    healthAction.typeClinicToSearch('Aberdeen');

    //step6. Search for "New Territories"
    healthAction.clickOnSearchClinic();
    healthAction.typeClinicToSearch('Hong Kong Island');

    //VP2. Verify "Recent Searches"
    healthAction.clickOnSearchClinic();
    healthAction.clickOnRecentSearchesLabel();

    let firstPosition = healthAction.isRecentSearchesDisplayed('1');
    let secondPosition = healthAction.isRecentSearchesDisplayed('2');
    let thirdPosition = healthAction.isRecentSearchesDisplayed('3');
    let fourthPosition = healthAction.isRecentSearchesDisplayed('4');
    expect(firstPosition).toEqual('Hong Kong Island');
    expect(secondPosition).toEqual('Aberdeen');
    expect(thirdPosition).toEqual('Outlying Islands');
    expect(fourthPosition).toEqual('Kowloon');
    expect(firstPosition).not.toEqual('New Territories');
    expect(secondPosition).not.toEqual('New Territories');
    expect(thirdPosition).not.toEqual('New Territories');
    expect(fourthPosition).not.toEqual('New Territories');
    healthAction.typeClinicToSearch(' ');
    healthAction.clickOnSearchClinic();
    healthAction.clickOnCancelButton();
    //Story #118: Filter clinic via filter button on map view
    expect(healthAction.isHealthMapsPageDisplayed()).toBeTruthy(); // map displayed based on your users location
    //Step2. Click on "filter" button
    healthAction.clickOnFilterButton();
    //Step3. Select a record and click "Show results" button
    healthAction.selectTypeOfClinic();
    healthAction.clickOnShowResults();
    //VP 1. Verify the clinic is changed
    expect(healthAction.getTextClinicName()).toBeTruthy();
    //Step4. Click the "search clinic or location" text field
    healthAction.clickOnSearchClinic();
    //Step5. Search a clinic under the filter
    healthAction.typeClinicToSearch(area.Clinic);
    //VP2. Verify the clinic is changed
    expect(healthAction.getTextClinicName()).toBeTruthy();
    //Step6. Click the filter icon
    healthAction.clickOnFilterButtonAfterSearch();
    //Step7. Click the "Clear all" button
    healthAction.clickOnClearAllButton();
    //Step8. Click the "Show results" button
    healthAction.clickOnShowResults();
    //VP3. Verify the clinic is present.
    expect(healthAction.getTextClinicName()).toBeTruthy();
    //Story #124: Filter clinic via filter button on list view
    expect(healthAction.isHealthMapsPageDisplayed()).toBeTruthy(); // map displayed based on your users location
    expect(healthAction.isClinicDisplayed()).toBeTruthy();
    healthAction.clickOnListTab();
    //Step2. Click on "filter" button
    healthAction.clickOnFilterButton();
    //Step3. Select a record and click "Show results" button
    healthAction.selectTypeOfClinic();
    healthAction.clickOnShowResults();
    //VP 1. Verify the clinic is changed
    expect(healthAction.getTextClinicNameInListTab()).toBeTruthy();
    //Step4. Click the "search clinic or location" text field
    healthAction.clickOnSearchClinic();
    //Step5. Search a clinic under the filter
    healthAction.typeClinicToSearch(area.Clinic);
    //VP2. Verify the clinic is changed
    expect(healthAction.getTextClinicNameInListTab()).toBeTruthy();
    //Step6. Click the filter icon
    healthAction.clickOnFilterButtonAfterSearch();
    //Step7. Click the "Clear all" button
    healthAction.clickOnClearAllButton();
    //Step8. Click the "Show results" button
    healthAction.clickOnShowResults();
    //VP3. Verify the clinic is present.
    expect(healthAction.getTextClinicNameInListTab()).toBeTruthy();
  });

  // login here for landing page
  // health landing page
  it('be able to view the health landing page', () => {
    //#38: view the bar graph risk scores
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
    //#37: View graphical risk score
    if (platform === 'ios') {
      expect(healthAction.isGraphicHistoryScoreDisplay()).toBeTruthy();
      const graphicRiskNumber = healthAction.getGraphicRiskNumber();
      const actualHealthScoreBar = healthAction.getScoreOfLastBarOfGraphicRiskScore();
      expect(actualHealthScoreBar).toBe(graphicRiskNumber);
    }
  });
});
