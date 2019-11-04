import HealthScreen from '../screenobjects/health.screen';
import HealthLandingScreen from '../screenobjects/health.landing.screen';
import HealthUpdateScreen from '../screenobjects/health.update.screen';
import HealthMapsScreen from '../screenobjects/health.maps.screen';
import NavigationBar from '../screenobjects/navigationbar.screen';
import txt from '../helpers/text';
import {
  photo,
  swipeSlider,
  swipeUp,
  platform as getPlatform,
  tap
} from '../helpers/api';
const { join } = require('path');
const cmd = require('node-cmd');
import { $txt } from '../helpers/text';

export function countBarGraph() {
  const element =
    '(//XCUIElementTypeOther[@name="Health Score History Graph showing last 6 records."])[3]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther';
  let i = 0;
  let count = 0;
  let elems = $(element).$$('XCUIElementTypeOther');
  let totalLength = elems.length;

  let lastElementLocation = elems[totalLength - 2].getLocation();
  while (i < totalLength) {
    const location = elems[i].getLocation();
    if (location.y === lastElementLocation.y) {
      count = count + 1;
    }
    i = i + 1;
  }
  count = count / 2;
  return count;
}
export function clickOnFirstAreasInList() {
  let firstArea = HealthMapsScreen.firstAreaInList;
  HealthMapsScreen.scrollDownToElement(firstArea, 20);
  firstArea.click();
}

export function clickOnFirstDistrictInList() {
  let firstDistrict = HealthMapsScreen.firstDistrictInList;
  HealthMapsScreen.scrollDownToElement(firstDistrict, 20);
  firstDistrict.click();
}

export function clickOnAreasOnList(areas) {
  const platform = getPlatform();

  if (platform === 'ios') {
    const areaIOS = $(`(//XCUIElementTypeOther[@name=" ${areas} "])[2]`);
    HealthMapsScreen.scrollDownToElement(areaIOS, 20);
    areaIOS.click();
  } else {
    const areaAndroid = $(txt(` ${areas} `));
    HealthMapsScreen.scrollDownToElement(areaAndroid, 20);
    areaAndroid.click();
  }
}
export function typeClinicToSearch(areas) {
  const platform = getPlatform();
  let searchTxt = HealthMapsScreen.searchClinicTextField;
  HealthMapsScreen.waitForElementIsShown(searchTxt);
  searchTxt.setValue(areas);
  if (platform === 'android') {
    HealthMapsScreen.wait(3000);
    $(txt(areas, 'android.widget.EditText')).click();
  }
  HealthMapsScreen.wait(3000);
  tapOnSearchButton();
}
export function clickOnAreasLabel() {
  HealthMapsScreen.areasLabel.click();
}

export function clickOnRecentSearchesLabel() {
  HealthMapsScreen.recentSearchesLabel.click();
}

export function isNearMeOnListViewWorkFine() {
  return isClinicsFound() === true || isNoClinicAvailableDisplayed() === true;
}

export function isClinicsFound() {
  let numberOfClinic = HealthMapsScreen.numberClinicFound;
  HealthMapsScreen.waitForElementIsShown(numberOfClinic);
  return numberOfClinic.isExisting();
}

export function isNoClinicAvailableDisplayed() {
  let noAvailableClinic = HealthMapsScreen.noClinicAvailable;
  HealthMapsScreen.waitForElementIsShown(noAvailableClinic);
  return noAvailableClinic.isExisting();
}

export function clickOnListTab() {
  HealthMapsScreen.listTabButton.click();
}

export function clickOnMapTab() {
  HealthMapsScreen.waitForElementIsShown(HealthMapsScreen.mapTabButton);
  HealthMapsScreen.mapTabButton.click();
}
export function tapOnSearchButton() {
  const platform = getPlatform();
  const { width } = driver.getWindowRect();
  const { height } = driver.getWindowRect();

  if (platform === 'ios') {
    tap(width * 0.875, height * 0.875);
  } else {
    driver.execute('mobile: performEditorAction', { action: 'search' });
    //tap(width * 0.95, height * 0.95);
  }
}

export function clickOnDirectionButton() {
  let dirButton = HealthMapsScreen.directionsButton;
  HealthMapsScreen.waitForElementIsShown(dirButton);
  dirButton.click();
}

export function isDirectionPageDisplayed() {
  const platform = getPlatform();
  if (platform === 'ios') {
    let changeRoute = $('~Change Route');
    HealthMapsScreen.waitForElementIsShown(changeRoute);
    return changeRoute.isExisting();
  } else {
    HealthMapsScreen.waitForElementIsShown($(txt('Your location')));
    return $(txt('Your location')).isExisting(); // Notice: Base on each google map app on each device
  }
}
export function isCallPageDisplayed() {
  const platform = getPlatform();
  if (platform === 'ios') {
    try {
      driver.execute('mobile:alert', { action: 'accept' });
      return true;
    } catch (error) {
      return false;
    }
  } else {
    let call = $txt('New contact', 'android.widget.TextView');
    HealthMapsScreen.waitForElementIsShown(call);
    return call.isExisting();
  }
}
export function clickOnCallButton() {
  let callBtn = HealthMapsScreen.callButton;
  HealthMapsScreen.waitForElementIsShown(callBtn);
  callBtn.click();
}

export function isDefaultClinicDisplayed() {
  return HealthMapsScreen.defaultClinic.isExisting();
}

export function clickOnShowAllClinic() {
  HealthMapsScreen.showAllClinicButton.click();
}

export function clickOnNearByButton() {
  HealthMapsScreen.nearMeButton.click();
}

export function clickOnSearchClinic() {
  HealthMapsScreen.searchClinicTextField.click();
}

export function clickOnBackArrow() {
  let backArr = HealthMapsScreen.backArrow;
  HealthMapsScreen.waitForElementIsShown(backArr);
  backArr.click();
}

export function searchForClinic(clinic) {
  //  HealthMapsScreen.waitForElementIsShown(
  //    $(`//android.view.View[@content-desc="Google Map"]`)
  // );
  let searchinput = HealthMapsScreen.searchClinicTextField;
  HealthMapsScreen.waitForElementIsShown(searchinput);
  searchinput.click();
  searchinput.setValue(clinic);
  //incomplete for android, unable to create on serach buton from keyboard.
  //driver.execute( "mobile: performEditorAction", { "action": "search" } );
  // driver.press_keycode(66)
  tapOnSearchButton();
}

export function clickOnDirectionsButtonOnDetailsPage(directions) {
  const platform = getPlatform();
  let element = '';
  if (platform === 'ios') {
    element = $(
      `//XCUIElementTypeOther[@name="Direction Icon ${directions} Right Arrow Icon"]`
    );
    HealthMapsScreen.waitForElementIsShown(element);
  } else {
    element = $('~Direction Icon');
    HealthMapsScreen.waitForElementIsShown(element);
  }
  element.click();
}

export function clickOnCallButtonOnDetailsPage(number) {
  const platform = getPlatform();
  let element = '';
  if (platform === 'ios') {
    element = $(
      `//XCUIElementTypeOther[@name="Phone Icon ${number} Right Arrow Icon"]`
    );
  } else {
    element = $('~Phone Icon');
  }

  HealthMapsScreen.waitForElementIsShown(element);
  element.click();
}

export function clickOnClinic() {
  /*const platform = getPlatform();
  const { width } = driver.getWindowRect();
  const { height } = driver.getWindowRect();
  // Notice: This would be change depend on phone screen size
  if (platform === 'ios') {
    tap(width * 0.5, height * 0.85);
  } else {
    tap(width * 0.5, height * 0.8);
    tap(width * 0.5, height * 0.8);
  }


  const platform = getPlatform();
  let element;
  if (platform === 'ios') {
    element = $(`(//XCUIElementTypeOther[@name="${clinic} "])[2]`);
  } else {
    element = $(
      `//android.view.ViewGroup[@content-desc="${clinic} "]/android.view.ViewGroup`
    );
  }*/
  let element = HealthMapsScreen.firstClinicInThetMapTab;
  element.click();
}

export function isClinicDisplayeWithName() {
  let element = $(
    `(//XCUIElementTypeOther[@name="Compass My location Google Maps"])[1]/../XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther`
  );
  HealthMapsScreen.waitForElementIsShown(element);
  return element.isExisting();
}

export function isClinicDisplayed() {
  const platform = getPlatform();
  if (platform === 'ios') {
    let element = $(
      `(//XCUIElementTypeOther[@name="Compass My location Google Maps"])[1]/../XCUIElementTypeOther[2]/XCUIElementTypeOther`
    );
    HealthMapsScreen.waitForElementIsShown(element);
    return element.isExisting();
  } else {
    let element = $(
      `//android.view.View[@content-desc="Google Map"]/../../../android.view.ViewGroup/android.view.ViewGroup[1]`
    );
    HealthMapsScreen.waitForElementIsShown(element);
    return element.isExisting();
  }
}

export function isClinicDetailPageDisplayed() {
  HealthMapsScreen.waitForElementIsShown(HealthMapsScreen.clinicTypeLabel);
  return HealthMapsScreen.clinicTypeLabel.isExisting();
}
export function isLifeStyleTabSelected() {
  HealthLandingScreen.waitForIsShown(true);
  const isSelected = NavigationBar.getAttributeOfElement(
    NavigationBar.healthNavigator(),
    'selected'
  );
  return isSelected;
}

export function slideFaceAging(from, to) {
  HealthScreen.scrollDownToElement(HealthScreen.agingSlider, 10);
  swipeSlider(HealthScreen.agingSlider, from, to);
}

export function getGraphicRiskNumber() {
  HealthScreen.waitForIsShown(true);
  return parseInt(HealthScreen.graphicRiskNumber.getText());
}

export function getHeighOfLastBarOfGraphicRiskScore() {
  HealthScreen.scrollDownToElement(HealthScreen.historyGraph, 10);
  return HealthScreen.lastBarHistoryGraph.getSize('height');
}

export function getScoreOfLastBarOfGraphicRiskScore() {
  const heightOfLastBar = getHeighOfLastBarOfGraphicRiskScore();
  const heightOfGraphicRiskScore = getHeightOfGraphicAssessmentScore();

  return Math.round((heightOfLastBar / heightOfGraphicRiskScore) * 100);
}

export function getHeightOfGraphicAssessmentScore() {
  return HealthScreen.historyGraphToGetHeight.getSize('height');
}

export function isFutureYouAtTheAgeOf(age) {
  //  HealthScreen.scrollDownToElement(HealthScreen.historyGraph, 10);
  const platform = getPlatform();

  if (platform === 'ios') {
    return $(`~${age}`).isExisting();
  } else {
    HealthScreen.waitForIsShown(HealthScreen.isTextExisting(age));
    return HealthScreen.isTextExisting(age);
  }
}

export function copyImageToLibrary() {
  const platform = getPlatform();

  if (platform === 'ios') {
    cmd.run(
      'xcrun simctl addmedia booted ' +
        join(process.cwd(), 'tests/data', 'face-image.jpg')
    );
  }
  if (platform === 'android') {
    cmd.run('adb shell mkdir /storage/emulated/0/Download/NewImages');
    cmd.run(
      'adb push ' +
        join(
          process.cwd(),
          'tests/data',
          'face-image.jpg /storage/emulated/0/Download/NewImages'
        )
    );
  }
}
export function clickNextButton() {
  HealthUpdateScreen.scrollDownToElement(HealthUpdateScreen.next, 50);
  HealthUpdateScreen.next.click();
}

export function isGraphicHistoryScoreDisplay() {
  HealthScreen.waitForIsShown(true);
  return HealthScreen.graphicRiskNumber.isExisting();
}

export function isPhotoExistingOnUpdatePage() {
  return HealthUpdateScreen.myPhoto.isExisting();
}

export function isBarGraphRiskDisplay() {
  let historyGraph = HealthScreen.historyGraph;
  HealthScreen.scrollDownToElement(historyGraph, 10);
  return historyGraph.isExisting();
}

export function isUpdateLifestyleButton() {
  let updateHealthDataBtn = HealthScreen.updateHealthDataButton;
  HealthScreen.waitForElementIsShown(updateHealthDataBtn);
  return updateHealthDataBtn.isExisting();
}

export function isPhotoExistingOnLifestylePage() {
  HealthScreen.waitForIsShown(true);
  HealthScreen.scrollDownToElement(HealthScreen.healthyLifeStylePicture, 10);
  HealthScreen.waitForElementIsShown(HealthScreen.healthyLifeStylePicture);
  return (
    HealthScreen.healthyLifeStylePicture.isExisting() &&
    HealthScreen.currentLifeStylePicture.isExisting()
  );
}

export function selectPhoto() {
  HealthUpdateScreen.scrollDownToElement(HealthUpdateScreen.addPhoto, 50);
  HealthUpdateScreen.addPhoto.click();

  const options = {
    ios: {
      permit: true,
      photo: '//XCUIElementTypeCell[contains(@name,"Photo, Landscape")][last()]'
    },
    android: {
      permit: true,
      photo: `android=${'new UiSelector().className("android.view.ViewGroup").index(1).packageName("com.google.android.apps.photos")'}`
    }
  };

  if (getPlatform() === 'ios') {
    photo('select', options.ios);
  } else {
    photo('select', options.android);
  }
}

export function takePhoto() {
  HealthUpdateScreen.scrollDownToElement(HealthUpdateScreen.next, 50);
  HealthUpdateScreen.addPhoto.click();
}

export function removePhoto() {
  HealthUpdateScreen.scrollDownToElement(HealthUpdateScreen.myPhoto, 50);
  if (isPhotoExistingOnUpdatePage()) {
    HealthUpdateScreen.myPhoto.click();
    photo('remove');
  }
}

export function isLandingHealthPageDisplayed() {
  HealthLandingScreen.waitForIsShown(true);
  return HealthLandingScreen.landingPageText.isExisting();
}

export function isAddMyHealthDataButtonDisplayed() {
  HealthLandingScreen.waitForIsShown(true);
  return HealthLandingScreen.addMyHealthDataButton.isExisting();
}

export function isSearchForClinicButtonDisplayed() {
  HealthLandingScreen.waitForIsShown(true);
  return HealthLandingScreen.searchForClinicButton.isExisting();
}

export function clickSearchForClinicButton() {
  // HealthScreen.waitForIsShown(true);
  let searchClinicBtn = HealthScreen.searchForClinicButton;
  HealthScreen.scrollDownToElement(searchClinicBtn, 50);
  searchClinicBtn.click();
}

export function denyAccessLocation() {
  const platForm = getPlatform();
  if (platForm === 'ios') {
    driver.execute('mobile:alert', { action: 'dismiss' });
  }

  if (platForm === 'android') {
    if ($txt('DENY', 'android.widget.Button').isExisting()) {
      let deny = $txt('DENY', 'android.widget.Button');
      deny.click();
      deny.click();
    }
  }
}

export function allowAccessLocation() {
  const platForm = getPlatform();
  if (platForm === 'ios') {
    driver.execute('mobile:alert', { action: 'accept' });
  }

  if (platForm === 'android') {
    if ($txt('ALLOW', 'android.widget.Button').isExisting()) {
      let allow = $txt('ALLOW', 'android.widget.Button');
      allow.click();
      allow.click();
      HealthMapsScreen.wait(3000);
    }
  }
}
export function isHealthMapsPageDisplayed() {
  HealthMapsScreen.waitForElementIsShown(HealthMapsScreen.maps);
  return HealthMapsScreen.maps.isDisplayed();
}

export function clickAddMyHealthDataButton() {
  let addMyHealthBtn = HealthLandingScreen.addMyHealthDataButton;
  HealthLandingScreen.waitForIsShown(true);
  HealthUpdateScreen.scrollUpToElement(addMyHealthBtn, 50);
  addMyHealthBtn.click();
}

export function clickUpdateHealthDataButton() {
  HealthScreen.waitForIsShown(true);
  let updateButton = HealthScreen.updateHealthDataButton;
  HealthScreen.waitForElementIsShown($(txt('My lifestyle overview')));
  swipeUp(0.25);
  HealthScreen.waitForElementIsShown(updateButton);
  HealthScreen.updateHealthDataButton.click();
}

export function updateHealthAs(updateHealthData) {
  //HealthUpdateScreen.waitForIsShown(true);

  // Height
  let height = HealthUpdateScreen.heightField;
  height.click();
  height.setValue(updateHealthData.Height);
  let aboutme = HealthUpdateScreen.AboutMe;
  aboutme.click();

  // Weight
  let weight = HealthUpdateScreen.weightField;
  weight.click();
  weight.setValue(updateHealthData.Weight);
  aboutme.click();

  /* //Pending temporary these action, just focust on entering values in Height and Weight
  // Waist
  HealthUpdateScreen.waistField.click();
  HealthUpdateScreen.waistField.setValue(updateHealthData.Waist);
  HealthUpdateScreen.AboutMe.click();
*/
  // Ethnicity
  const platForm = getPlatform();
  let value;
  value = HealthUpdateScreen.selectAsianOption;
  if (platForm === 'ios') {
    HealthUpdateScreen.waitForElementIsShown(value);
    value.click();
  } else {
    //    if (expect(value.isSelected()).toBe(false)) {
    HealthUpdateScreen.waitForElementIsShown(value);
    value.click();
    //    } else {
    //      console.log('Already Selected');
    //    }
  }
  //  HealthUpdateScreen.waitForElementIsShown(value);
  //  value.click();
  HealthUpdateScreen.waitForElementIsShown(aboutme);
  swipeUp(1);
  swipeUp(0.75);
  if (platForm === 'android') {
    swipeUp(0.5);
  }
  HealthUpdateScreen.foodDropdown.click();
  let chocolate = HealthUpdateScreen.chocolateInFoodList;
  if (platForm === 'android') {
    if (expect(chocolate.isSelected()).toBe(false)) {
      HealthUpdateScreen.waitForElementIsShown(chocolate);
      chocolate.click();
      HealthUpdateScreen.selectFoodButton.click();
    } else {
      console.log('Already Selected');
      HealthUpdateScreen.selectFoodButton.click();
    }
  } else {
    HealthUpdateScreen.waitForElementIsShown(chocolate);
    chocolate.click();
    HealthUpdateScreen.selectFoodButton.click();
  }

  //Frquency
  let frequency = HealthUpdateScreen.frequencyField;
  HealthUpdateScreen.scrollDownToElement($(txt(frequency), 50));
  frequency.click();
  let frequencyValue = HealthUpdateScreen.frequencyFieldDropdown;
  HealthUpdateScreen.waitForElementIsShown(frequencyValue);
  frequencyValue.click();
  //frequency.setValue(updateHealthData.Frequency);

  //Upload photo
  removePhoto(); // Pre-condition: Remove photo if a photo exists
  // select a photo
  selectPhoto();
  expect(isPhotoExistingOnUpdatePage()).toBeTruthy();

  /* // My choices
  if (updateHealthData.ExerciseMoreThan20 === 'true') {
    // TODO: if not selected
    HealthUpdateScreen.scrollDownToElement(HealthUpdateScreen.exercise20, 50);
    HealthUpdateScreen.exercise20.click();
  }

  // Sugar beverages
  // HealthUpdateScreen.scrollDownToElement($('~' + updateHealthData.sugaryBeverage), 50);
  // ($('~' + updateHealthData.sugaryBeverage)).click();
  HealthUpdateScreen.scrollDownToElement(
    $(txt(updateHealthData.SugaryBeverage), 50)
  );
  $(txt(updateHealthData.SugaryBeverage)).click();

  // My health (pending)

  // Doing interesting
  if (updateHealthData.Interest === 'Not at all') {
    HealthUpdateScreen.scrollDownToElement(
      HealthUpdateScreen.notAtAllInteresting, 50
    );
    HealthUpdateScreen.notAtAllInteresting.click();
  } else {
    HealthUpdateScreen.scrollDownToElement($(txt(updateHealthData.Interest)), 50);
    $(txt(updateHealthData.Interest)).click();
  }

  // Depress
  if (updateHealthData.Depress === 'Not at all') {
    HealthUpdateScreen.scrollDownToElement(HealthUpdateScreen.notAtAllDepress, 50);
    HealthUpdateScreen.notAtAllDepress.click();
  } else {
    HealthUpdateScreen.scrollDownToElement($(txt(updateHealthData.Depress)), 50);
    $(txt(updateHealthData.Depress)).click();
  }
  */
  // Click Next
  let showResult = HealthUpdateScreen.showResult;
  HealthUpdateScreen.scrollDownToElement(showResult, 50);
  showResult.click();

  HealthScreen.waitForIsShown(true);
}

export function addImage() {
  clickAddMyHealthDataButton();
  removePhoto(); // Pre-condition: Remove photo if a photo exists

  // select a photo
  selectPhoto();

  // verify taken photo is uploaded and displayed in the health page
  expect(isPhotoExistingOnUpdatePage()).toBeTruthy();
  clickNextButton();
}

export function isExerciseDisplayActive() {
  HealthScreen.scrollRightOnElementToFindElement(
    HealthScreen.healthFigure,
    $(txt('EXERCISE'))
  );
  HealthScreen.isTextExisting('Active');
}

export function clickOnCancelButton() {
  let cancel = HealthMapsScreen.clickOnCancelBtn;
  cancel.click();
}
export function getTextBmiHeader() {
  HealthScreen.waitForIsShown(true);
  swipeUp(0.4);
  return HealthScreen.bmiHeader.getText();
}

export function getTextBmiScore() {
  return HealthScreen.bmiRiskScore.getText();
}

export function getTextBmiStatus() {
  return HealthScreen.bmiRiskStatus.getText();
}

export function getTextBmiStatement() {
  return HealthScreen.bmiRiskStatement.getText();
}

export function getTextDiabetesHeader() {
  const platForm = getPlatform();
  if (platForm === 'android') {
    HealthScreen.scrollRightOnElementToFindElement(
      $(txt('BMI')),
      $(txt('Diabetes'))
    );
    return HealthScreen.diabetesHeader.getText();
  } else {
    HealthScreen.scrollRightOnElementToFindElement(
      HealthScreen.bmiHeader,
      HealthScreen.diabetesHeader
    );
    return HealthScreen.diabetesHeader.getText();
  }
}
export function getTextDiabetesScore() {
  return HealthScreen.diabetesRiskScore.getText();
}

export function getTextDiabetesStatus() {
  return HealthScreen.diabetesRiskStatus.getText();
}

export function getTextDiabetesStatement() {
  return HealthScreen.diabetesRiskStatement.getText();
}

export function isBMIDisplayCorrectly(scope, status, statement) {
  HealthScreen.waitForIsShown(true);
  HealthScreen.scrollDownToElement(HealthScreen.searchForClinicButton, 10);
  return (
    HealthScreen.isTextExisting(scope) &&
    HealthScreen.isTextExisting(status) &&
    HealthScreen.isTextExisting(statement)
  );
}

export function isDiabeteDisplayCorrectly(status, text) {
  HealthScreen.scrollRightOnElementToFindElement(
    HealthScreen.healthFigure,
    $(txt('DIABETES'))
  );
  return (
    HealthScreen.isTextExisting(status) && HealthScreen.isTextExisting(text)
  );
}

export function isAlcoholDisplayCorrectly(assessment, statement) {
  HealthScreen.scrollRightOnElementToFindElement(
    HealthScreen.healthFigure,
    $(txt('ALCOHOL'))
  );
  return (
    HealthScreen.isTextExisting(assessment) &&
    HealthScreen.isTextExisting(statement)
  );
}

export function isTobaccoDisplayCorrectly(assessment, statement) {
  HealthScreen.scrollRightOnElementToFindElement(
    HealthScreen.healthFigure,
    $(txt('TOBACCO'))
  );
  return (
    HealthScreen.isTextExisting(assessment) &&
    HealthScreen.isTextExisting(statement)
  );
}

export function isExerciseDisplayCorrectly(assessment, statement) {
  HealthScreen.scrollRightOnElementToFindElement(
    HealthScreen.healthFigure,
    $(txt('EXERCISE'))
  );
  return (
    HealthScreen.isTextExisting(assessment) &&
    HealthScreen.isTextExisting(statement)
  );
}

export function isNutritionDisplayCorrectly(assessment, statement) {
  HealthScreen.scrollRightOnElementToFindElement(
    HealthScreen.healthFigure,
    $(txt('NUTRITION'))
  );
  return (
    HealthScreen.isTextExisting(assessment) &&
    HealthScreen.isTextExisting(statement)
  );
}

export function isSleepDisplayCorrectly(assessment, statement) {
  HealthScreen.scrollRightOnElementToFindElement(
    HealthScreen.healthFigure,
    $(txt('SLEEP'))
  );
  return (
    HealthScreen.isTextExisting(assessment) &&
    HealthScreen.isTextExisting(statement)
  );
}

export function isMentalDisplayCorrectly(assessment, statement) {
  HealthScreen.scrollRightOnElementToFindElement(
    HealthScreen.healthFigure,
    $(txt('MENTAL'))
  );
  return (
    HealthScreen.isTextExisting(assessment) &&
    HealthScreen.isTextExisting(statement)
  );
}

export function isHealthResult() {
  return (
    HealthScreen.diabetesText('Low risk').isExisting() &&
    HealthScreen.bmiScore('27.2').isExisting()
  );
}
//Health Spec 2

export function clickOnFilterButton() {
  let filterButton = HealthMapsScreen.filterIcon;
  HealthMapsScreen.waitForElementIsShown(filterButton);
  filterButton.click();
}
export function clickOnFilterButtonAfterSearch() {
  let filterButton = HealthMapsScreen.filterIconAfterSearch;
  HealthMapsScreen.waitForElementIsShown(filterButton);
  filterButton.click();
}

export function selectTypeOfClinic() {
  let value = HealthMapsScreen.clinicType;
  HealthUpdateScreen.waitForElementIsShown(value);
  value.click();
}
export function clickOnShowResults() {
  let showResultButton = HealthMapsScreen.ShowResultFilterBtn;
  HealthMapsScreen.waitForElementIsShown(showResultButton);
  showResultButton.click();
}

export function clickOnClearAllButton() {
  let clearAllButton = HealthMapsScreen.clearAllFilterBtn;
  HealthMapsScreen.waitForElementIsShown(clearAllButton);
  clearAllButton.click();
}

export function getTextClinicName() {
  let element = HealthMapsScreen.firstClinicInThetMapTab;
  HealthMapsScreen.waitForElementIsShown(element);
  return element.getText();
}

export function getTextClinicNameInListTab() {
  let element = HealthMapsScreen.firstClinicInTheListTab;
  HealthMapsScreen.waitForElementIsShown(element);
  return element.getText();
}
export function employeeTakePhoto() {
  removePhoto();
  HealthUpdateScreen.scrollDownToElement(HealthUpdateScreen.next, 50);
  HealthUpdateScreen.addPhoto.click();
  HealthUpdateScreen.clickPhoto.click();
  HealthUpdateScreen.clickShutterButton.click();
  HealthUpdateScreen.clickDoneButton.click();
}
export function isRecentSearchesDisplayed(position) {
  //let clinic = $(txt(clinicName));
  //HealthMapsScreen.firstFourRecentSearch='1';
  let element = HealthMapsScreen.firstFourRecentSearch(position);
  HealthMapsScreen.waitForElementIsShown(element);
  console.log(element.getText());
  return element.getText();

  //HealthMapsScreen.waitForElementIsShown(clinic);
  //return clinic.isExisting();
}

export function isRecentSearchesHeaderDisplay() {
  let recentSearch = HealthMapsScreen.recentSearchesLabel;
  HealthMapsScreen.waitForElementIsShown(recentSearch);
  return recentSearch.isExisting();
}
