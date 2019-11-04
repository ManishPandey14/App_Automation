import AppScreen from './app.screen';
import { platform as getPlatform } from '../helpers/api';
import txt from '../helpers/text';

const SELECTORS = {
  // about me text
  ABOUT_ME_ANDROID: 'About me',
  ABOUT_ME_IOS: '//XCUIElementTypeStaticText[@name="About me"]',

  //Height textbox
  HEIGHT_FIELD_ANDROID: '~Height',
  HEIGHT_FIELD_IOS:
    '(//XCUIElementTypeTextField[@name="RNE__Input__text-input"])[1]',

  //weight textbox
  WEIGHT_FIELD_ANDROID: '~Weight',
  WEIGHT_FIELD_IOS:
    '(//XCUIElementTypeTextField[@name="RNE__Input__text-input"])[2]',

  // waist textbox
  WAIST_FIELD: '~Waist circumference',

  //frequency textbox
  FREQUENCY_FIELD_ANDROID:
    '//android.view.ViewGroup[starts-with(@content-desc,"Frequency, current selection")]/android.view.ViewGroup',
  FREQUENCY_FIELD_IOS:
    '(//XCUIElementTypeOther[starts-with(@name,"Frequency, current selection")])[2]',

  //Frequency Field Dropdown
  FREQUENCY_FIELD_DROPDOWN_IOS:
    '(//XCUIElementTypeOther[starts-with(@name,"0 days")])[2]',
  FREQUENCY_FIELD_DROPDOWN_ANDROID: '0 days',

  // food dropdown
  FOOD_DROPDOWN_ANDROID:
    '//android.view.ViewGroup[starts-with(@content-desc,"Select Food, current selection")]/android.view.ViewGroup',
  FOOD_DROPDOWN_IOS:
    '(//XCUIElementTypeOther[starts-with(@name,"Select Food, current selection")])[2]',

  // select chocolate option
  SELECT_CHOCOLATE_ANDROID:
    '//android.widget.TextView[@content-desc="Chocolate"]',
  SELECT_CHOCOLATE_IOS:
    '//XCUIElementTypeOther[@name="Chocolate"]/../XCUIElementTypeOther[num]',

  // Select food button
  SELECT_FOOD_BUTTON_ANDROID:
    '//android.view.ViewGroup[@content-desc="Select food"]/android.widget.TextView',
  SELECT_FOOD_BUTTON_IOS: '(//XCUIElementTypeOther[@name="Select food"])[3]',

  //Select food drop down header.
  SELECT_FOOD_DROPDOWN_HEADER_IOS:
    '//XCUIElementTypeOther[@name="Do you find any of these foods tempting (that is, do you want to eat more of them than you think you should)?"]',

  // Ethnicity drop down
  ETHNICITY_DROPDOWN_IOS:
    '(//XCUIElementTypeOther[starts-with(@name,"Ethnicity")])[3]',
  ETHNICITY_DROPDOWN_ANDROID:
    '//android.view.ViewGroup[starts-with(@content-desc,"Ethnicity, current selection")]/android.view.ViewGroup',

  // Ethnicity option "East Asian".
  SELECT_ASIAN_OPTION_IOS: '(//XCUIElementTypeOther[@name="I am Asian"])[3]',
  SELECT_ASIAN_OPTION_ANDROID: '~I am Asian',

  // Exercise 20
  EXERCISE_20: '~I exercise more than 20 minutes each day',

  SUGARY_BEVERAGE: '~0 to 2 times per week',
  NOT_AT_ALL_INTERESTING_IOS: '(//XCUIElementTypeOther[@name="Not at all"])[1]',
  NOT_AT_ALL_INTERESTING_ANDROID:
    '(//android.view.ViewGroup[@content-desc="Not at all"])[1]/android.view.ViewGroup/android.widget.TextView',
  NOT_AT_ALL_DEPRESS_IOS: '(//XCUIElementTypeOther[@name="Not at all"])[2]',
  NOT_AT_ALL_DEPRESS_ANDROID:
    '(//android.view.ViewGroup[@content-desc="Not at all"])[2]/android.view.ViewGroup/android.widget.TextView',

  //click show Results Option
  SHOW_RESULT_ANDROID:
    '//android.view.ViewGroup[@content-desc="Show results"]/android.widget.TextView',
  SHOW_RESULT_IOS: '(//XCUIElementTypeOther[@name="Show results"])[3]',

  //click On Next of Add Health Screen
  NEXT: '~Next',

  //clickOn Add Photo
  ADD_PHOTO: '~Add photo for Future me',

  MY_PHOTO_ANDROID:
    '//android.view.ViewGroup[contains(@content-desc,"photo of Future me")]',
  MY_PHOTO_IOS: '(//XCUIElementTypeOther[@name="View photo of Future me"])[3]',
  //(//XCUIElementTypeOther[@name="Add photo for Future me"])[3]
  CLICK_PHOTO: 'Take a Photo',
  CAMERA:
    '//android.widget.GridView[starts-with(@id,"android.miui:id/resolver_grid")]/android.widget.LinearLayout',
  SHUTTER_BUTTON: '~Shutter button',
  DONE: '~Done'
};

class HealthUpdateScreen extends AppScreen {
  constructor() {
    super(SELECTORS.HEALTH_UPDATE_SCREEN);
    this.platform = getPlatform().toUpperCase();
  }

  get ethnicityDropdown() {
    return $(SELECTORS[`ETHNICITY_DROPDOWN_${this.platform}`]);
  }

  get selectFoodHeader() {
    return $(SELECTORS[`SELECT_FOOD_DROPDOWN_HEADER_IOS`]);
  }

  get selectAsianOption() {
    if (this.platform == 'IOS') {
      return $(SELECTORS[`SELECT_ASIAN_OPTION_IOS`]);
    } else {
      return $(SELECTORS.SELECT_ASIAN_OPTION_ANDROID);
    }
  }

  get selectFoodButton() {
    return $(SELECTORS[`SELECT_FOOD_BUTTON_${this.platform}`]);
  }

  get foodDropdown() {
    return $(SELECTORS[`FOOD_DROPDOWN_${this.platform}`]);
  }

  get chocolateInFoodList() {
    if (this.platform == 'IOS') {
      var number = Math.floor(Math.random() * 8);
      SELECTORS.SELECT_CHOCOLATE_IOS = SELECTORS.SELECT_CHOCOLATE_IOS.replace(
        'num',
        number + ''
      );
      return $(SELECTORS[`SELECT_CHOCOLATE_IOS`]);
    } else {
      return $(SELECTORS[`SELECT_CHOCOLATE_${this.platform}`]);
    }
  }

  get frequencyField() {
    return $(SELECTORS[`FREQUENCY_FIELD_${this.platform}`]);
  }

  get frequencyFieldDropdown() {
    if (this.platform == 'IOS') {
      return $(SELECTORS[`FREQUENCY_FIELD_DROPDOWN_IOS`]);
    } else {
      //return $(txt(SELECTORS.FREQUENCY_FIELD_DROPDOWN_ANDROID));
      var number = Math.floor(Math.random() * 8);
      if (number === 1) {
        return $(txt('1 day'));
      } else {
        return $(
          txt(
            SELECTORS.FREQUENCY_FIELD_DROPDOWN_ANDROID.replace('0', number + '')
          )
        );
      }
    }
  }

  get exercise20() {
    return $(SELECTORS.EXERCISE_20);
  }

  get sugaryBeverage() {
    return $(SELECTORS.SUGARY_BEVERAGE);
  }
  get notAtAllInteresting() {
    return $(SELECTORS[`NOT_AT_ALL_INTERESTING_${this.platform}`]);
  }

  get notAtAllDepress() {
    return $(SELECTORS[`NOT_AT_ALL_DEPRESS_${this.platform}`]);
  }

  get heightField() {
    if (this.platform == 'IOS') {
      return $(SELECTORS[`HEIGHT_FIELD_IOS`]);
    } else {
      return $(SELECTORS.HEIGHT_FIELD_ANDROID);
    }
  }

  get weightField() {
    if (this.platform == 'IOS') {
      return $(SELECTORS[`WEIGHT_FIELD_IOS`]);
    } else {
      return $(SELECTORS.WEIGHT_FIELD_ANDROID);
    }
  }

  get waistField() {
    return $(SELECTORS.WAIST_FIELD);
  }

  get AboutMe() {
    if (this.platform == 'IOS') {
      return $(SELECTORS[`ABOUT_ME_IOS`]);
    } else {
      return $(txt(SELECTORS.ABOUT_ME_ANDROID));
    }
  }

  get showResult() {
    return $(SELECTORS[`SHOW_RESULT_${this.platform}`]);
  }

  get next() {
    return $(SELECTORS.NEXT);
  }

  get addPhoto() {
    return $(SELECTORS.ADD_PHOTO);
  }

  get myPhoto() {
    return $(SELECTORS[`MY_PHOTO_${this.platform}`]);
  }

  get clickPhoto() {
    return $(txt(SELECTORS.CLICK_PHOTO));
  }

  get captureImage() {
    return $(SELECTORS[`CAMERA_${this.platform}`]);
  }

  get clickShutterButton() {
    return $(SELECTORS.SHUTTER_BUTTON);
  }
  get clickDoneButton() {
    return $(SELECTORS.DONE);
  }
}
export default new HealthUpdateScreen();
