import AppScreen from './app.screen';
import txt from '../helpers/text';
import { platform as getPlatform } from '../helpers/api';

const SELECTORS = {
  ADD_MY_HEALTH_DATA_BUTTON_IOS:
    '(//XCUIElementTypeOther[@name="Add My Health Data"])[2]',
  ADD_MY_HEALTH_DATA_BUTTON_ANDROID:
    '//android.view.ViewGroup[@content-desc="Add My Health Data"]',
  SEARCH_FOR_CLINICS_BUTTON_IOS: '~Search for clinics',
  SEARCH_FOR_CLINICS_BUTTON_ANDROID:
    '//android.view.ViewGroup[@content-desc="Search for clinics"]'
};

class HealthLandingScreen extends AppScreen {
  constructor() {
    super(
      SELECTORS[`ADD_MY_HEALTH_DATA_BUTTON_${getPlatform().toUpperCase()}`]
    );
    this.platform = getPlatform().toUpperCase();
  }

  get searchForClinicButton() {
    if (this.platform == 'IOS') {
      return $(SELECTORS.SEARCH_FOR_CLINICS_BUTTON_IOS);
    } else {
      return $(SELECTORS[`SEARCH_FOR_CLINICS_BUTTON_ANDROID`]);
    }
  }

  get addMyHealthDataButton() {
    return $(SELECTORS[`ADD_MY_HEALTH_DATA_BUTTON_${this.platform}`]);
  }

  get landingPageText() {
    return $(txt('Become a better version of yourself !'));
  }
}
export default new HealthLandingScreen();
