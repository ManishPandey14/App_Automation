import AppScreen from './app.screen';
import { platform as getPlatform } from '../helpers/api';
import txt from '../helpers/text';

const SELECTORS = {
  SEARCH_CLINIC_IOS: '~searchInput',
  SEARCH_CLINIC_ANDROID: '//android.widget.EditText',
  CLINIC_TYPE_LABEL_IOS: '~Clinic type',
  CLINIC_TYPE_LABEL_ANDROID: 'Clinic type',
  MAP_TAB: '~Map Tab',
  MAPS_ANDROID: '//android.view.View[@content-desc="Google Map"]',
  MAPS_IOS: '//XCUIElementTypeOther[@name="Compass My location Google Maps"]',
  CALL_BUTTON_IOS: '(//XCUIElementTypeOther[@name="Call"])[2]',
  CALL_BUTTON_ANDROID: 'Call',
  DIRECTION_BUTTON_IOS: '(//XCUIElementTypeOther[@name="Directions"])[2]',
  DIRECTION_BUTTON_ANDROID: 'Directions',
  NEAR_ME_IOS: '~Near me',
  NEAR_ME_ANDROID: 'Near me',
  DEFAULT_CLINIC_IOS:
    '(//XCUIElementTypeOther[@name="Allied Medical Practice Group (Tsuen Wan - Nan Fung Centre) ( - ) "])[2]',
  DEFAULT_CLINIC_ANDROID: '~ASA Physiotherapy Clinic ASA ',
  SHOW_ALL_CLINIC_IOS: '~Show all clinics',
  SHOW_ALL_CLINIC_ANDROID: 'Show all clinics',
  LIST_TAB_ANDROID: 'List',
  LIST_TAB_IOS: '~List Tab',
  MAP_TAB_ANDROID: 'Map',
  NO_CLINIC_AVAILABLE_IOS: '~No clinics available',
  NO_CLINIC_AVAILABLE_ANDROID: 'No clinics available',
  NUMBER_CLINIC_FOUND_IOS:
    '//XCUIElementTypeStaticText[@name="Number of Clinics Found"]',
  NUMBER_CLINIC_FOUND_ANDROID: '~Number of Clinics Found',
  AREAS_LABEL_IOS: '//XCUIElementTypeStaticText[@name="Areas"]',
  AREAS_LABEL_ANDROID: 'Areas',
  RECENT_SEARCHES_LABEL_ANDROID: 'Recent searches',
  RECENT_SEARCHES_LABEL_IOS:
    '//XCUIElementTypeStaticText[@name="Recent searches"]',
  FIRST_AREA_IN_THE_AREA_LIST_IOS:
    '(//XCUIElementTypeOther[@name="Areas"])[1]/following-sibling::XCUIElementTypeOther[1]',
  FIRST_AREA_IN_THE_AREA_LIST_ANDROID:
    '//android.view.ViewGroup[@content-desc="Areas"]/../following-sibling::android.view.ViewGroup',
  FIRST_DISTRICT_IN_THE_LIST_IOS:
    '(//XCUIElementTypeOther[@name="Districts - Hong Kong Island"])[1]/following-sibling::XCUIElementTypeOther',
  BACK_ARROW_ANDROID: '',
  BACK_ARROW_IOS: '//XCUIElementTypeOther[@name="Go back"]',
  FIRST_DISTRICT_IN_THE_LIST_ANDROID:
    '//android.view.ViewGroup[@content-desc="Districts - Hong Kong Island"]/../following-sibling::android.view.ViewGroup',

  //FilterIcon
  FILTER_ICON_ANDROID:
    '//android.widget.EditText/../../following-sibling::android.view.ViewGroup[1]',
  FILTER_ICON_IOS:
    '//XCUIElementTypeOther[@name="Cancel"]/../../XCUIElementTypeOther[3]',
  FILTER_ICON_AFTER_SEARCH_IOS:
    '//XCUIElementTypeOther[@name="   Cancel"]/XCUIElementTypeOther[3]',
  CLINIC_TYPE_ANDROID:
    '//android.widget.TextView[@content-desc="GENERAL PRACTITIONERS & GROUP PRACTICES "]/..',
  CLINIC_TYPE_IOS:
    '//XCUIElementTypeOther[@name="General practitioners & group practices "]',
  //    '//XCUIElementTypeOther[@name="GENERAL PRACTITIONERS & GROUP PRACTICES "]',
  SHOW_RESULT_FILTER_ANDROID:
    '//android.view.ViewGroup[@content-desc="Show results"]',
  SHOW_RESULT_FILTER_IOS: '(//XCUIElementTypeOther[@name="Show results"])[3]',
  CLEAR_ALL_FILTER_ANDROID:
    '//android.view.ViewGroup[@content-desc="Clear all"]',
  CLEAR_ALL_FILTER_IOS: '(//XCUIElementTypeOther[@name="Clear all"])[4]',

  FIRST_DISPLAYED_CLINIC_IN_LIST_ANDROID:
    '//android.widget.TextView[@content-desc="Number of Clinics Found"]/../../../following-sibling::android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[1]',
  FIRST_DISPLAYED_CLINIC_IN_MAP_ANDROID:
    '//android.view.View[@content-desc="Google Map"]/../../../android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView',
  FIRST_DISPLAYED_CLINIC_IN_LIST_IOS:
    '(//XCUIElementTypeOther[@name="Number of Clinics Found"])[1]/following-sibling::XCUIElementTypeOther[1]/XCUIElementTypeOther',
  FIRST_DISPLAYED_CLINIC_IN_MAP_IOS:
    '(//XCUIElementTypeOther[@name="Compass My location Google Maps"])[1]/following-sibling::XCUIElementTypeOther',
  FIRST_FOUR_RECENT_SEARCH_ANDROID:
    '//android.view.ViewGroup[@content-desc="Recent searches"]/../following-sibling::android.view.ViewGroup[num]/android.view.ViewGroup/android.widget.TextView',
  FIRST_FOUR_RECENT_SEARCH_SET_ANDROID: '',
  FIRST_FOUR_RECENT_SEARCH_IOS:
    '(//XCUIElementTypeOther[@name="Recent searches"])[1]/following-sibling::XCUIElementTypeOther[num]/XCUIElementTypeOther',
  FIRST_FOUR_RECENT_SEARCH_SET_IOS: '',
  CANCEL_IOS: '//XCUIElementTypeButton[@name="Cancel"]'
};

class HealthMapsScreen extends AppScreen {
  constructor() {
    super(SELECTORS.MAP_TAB);
    this.platform = getPlatform().toUpperCase();
  }
  get firstClinicInThetMapTab() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`FIRST_DISPLAYED_CLINIC_IN_MAP_IOS`]);
    } else {
      return $(SELECTORS[`FIRST_DISPLAYED_CLINIC_IN_MAP_ANDROID`]);
    }
  }

  get firstClinicInTheListTab() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`FIRST_DISPLAYED_CLINIC_IN_LIST_IOS`]);
    } else {
      return $(SELECTORS[`FIRST_DISPLAYED_CLINIC_IN_LIST_ANDROID`]);
    }
  }

  get backArrow() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`BACK_ARROW_IOS`]);
    } else {
      return $(txt(SELECTORS.BACK_ARROW_ANDROID));
    }
  }

  get firstDistrictInList() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.FIRST_DISTRICT_IN_THE_LIST_IOS);
    } else {
      return $(SELECTORS.FIRST_DISTRICT_IN_THE_LIST_ANDROID);
    }
  }

  get firstAreaInList() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.FIRST_AREA_IN_THE_AREA_LIST_IOS);
    } else {
      return $(SELECTORS.FIRST_AREA_IN_THE_AREA_LIST_ANDROID);
    }
  }

  get areasLabel() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.AREAS_LABEL_IOS);
    } else {
      return $(txt(SELECTORS.AREAS_LABEL_ANDROID));
    }
  }

  get recentSearchesLabel() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`RECENT_SEARCHES_LABEL_IOS`]);
    } else {
      return $(txt(SELECTORS.RECENT_SEARCHES_LABEL_ANDROID));
    }
  }

  get numberClinicFound() {
    return $(SELECTORS[`NUMBER_CLINIC_FOUND_${this.platform}`]);
  }

  get noClinicAvailable() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.NO_CLINIC_AVAILABLE_IOS);
    } else {
      return $(txt(SELECTORS.NO_CLINIC_AVAILABLE_ANDROID));
    }
  }

  get listTabButton() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.LIST_TAB_IOS);
    } else {
      return $(txt(SELECTORS.LIST_TAB_ANDROID));
    }
  }

  get mapTabButton() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.MAP_TAB);
    } else {
      return $(txt(SELECTORS.MAP_TAB_ANDROID));
    }
  }

  get showAllClinicButton() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.SHOW_ALL_CLINIC_IOS);
    } else {
      return $(txt(SELECTORS.SHOW_ALL_CLINIC_ANDROID));
    }
  }
  get defaultClinic() {
    return $(SELECTORS[`DEFAULT_CLINIC_${this.platform}`]);
  }

  get nearMeButton() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.NEAR_ME_IOS);
    } else {
      return $(txt(SELECTORS.NEAR_ME_ANDROID));
    }
  }

  get directionsButton() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`DIRECTION_BUTTON_IOS`]);
    } else {
      return $(txt(SELECTORS.DIRECTION_BUTTON_ANDROID));
    }
  }

  get callButton() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`CALL_BUTTON_IOS`]);
    } else {
      return $(txt(SELECTORS.CALL_BUTTON_ANDROID));
    }
  }
  get clinicTypeLabel() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.CLINIC_TYPE_LABEL_IOS);
    } else {
      return $(txt(SELECTORS.CLINIC_TYPE_LABEL_ANDROID));
    }
  }

  get searchClinicTextField() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.SEARCH_CLINIC_IOS);
    } else {
      return $(SELECTORS[`SEARCH_CLINIC_ANDROID`]);
    }
  }

  get maps() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.MAPS_IOS);
    } else {
      return $(SELECTORS[`MAPS_ANDROID`]);
    }
  }

  //HealthSpec2 Action
  get filterIcon() {
    if (this.platform === 'ANDROID') {
      return $(SELECTORS[`FILTER_ICON_ANDROID`]);
    } else {
      return $(SELECTORS[`FILTER_ICON_IOS`]);
    }
  }
  get filterIconAfterSearch() {
    if (this.platform === 'ANDROID') {
      return $(SELECTORS[`FILTER_ICON_ANDROID`]);
    } else {
      return $(SELECTORS[`FILTER_ICON_AFTER_SEARCH_IOS`]);
    }
  }

  get clinicType() {
    if (this.platform === 'ANDROID') {
      return $(SELECTORS[`CLINIC_TYPE_ANDROID`]);
    } else {
      return $(SELECTORS[`CLINIC_TYPE_IOS`]);
    }
  }
  get ShowResultFilterBtn() {
    if (this.platform === 'ANDROID') {
      return $(SELECTORS[`SHOW_RESULT_FILTER_ANDROID`]);
    } else {
      return $(SELECTORS[`SHOW_RESULT_FILTER_IOS`]);
    }
  }
  get clearAllFilterBtn() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`CLEAR_ALL_FILTER_IOS`]);
    } else {
      return $(SELECTORS[`CLEAR_ALL_FILTER_ANDROID`]);
    }
  }
  get clickOnCancelBtn() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`CANCEL_IOS`]);
    } else {
      return $(SELECTORS[`CLEAR_ALL_FILTER_ANDROID`]);
    }
  }

  firstFourRecentSearch(position) {
    if (this.platform === 'IOS') {
      SELECTORS.FIRST_FOUR_RECENT_SEARCH_SET_IOS = SELECTORS.FIRST_FOUR_RECENT_SEARCH_IOS.replace(
        'num',
        position
      );
      return $(SELECTORS[`FIRST_FOUR_RECENT_SEARCH_SET_IOS`]);
    } else {
      SELECTORS.FIRST_FOUR_RECENT_SEARCH_SET_ANDROID = SELECTORS.FIRST_FOUR_RECENT_SEARCH_ANDROID.replace(
        'num',
        position
      );
      return $(SELECTORS[`FIRST_FOUR_RECENT_SEARCH_SET_ANDROID`]);
    }
  }
}
export default new HealthMapsScreen();
