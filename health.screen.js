import AppScreen from './app.screen';
import txt from '../helpers/text';
import { platform as getPlatform } from '../helpers/api';

const SELECTORS = {
  HEALTH_NAVIGATOR: '~Lifestyle, tab, 1 of 4',
  UPDATE_HEALTH_DATA_BUTTON_IOS:
    '(//XCUIElementTypeOther[@name="Update my lifestyle data"])[1]',
  UPDATE_HEALTH_DATA_BUTTON_ANDROID: 'Update my lifestyle data',
  HEALTH_FIGURE_IOS:
    '(//XCUIElementTypeOther[starts-with(@name,"BMI")])[1]/XCUIElementTypeScrollView',
  HEALTH_FIGURE_ANDROID:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.HorizontalScrollView/android.view.ViewGroup',
  LOADING_ICON_ANDROID:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[1]',
  LOADING_ICON_IOS: '', //todo
  HEALTHY_LIFESTYLE_ANDROID:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ImageView[1]',
  HEALTHY_LIFESTYLE_IOS:
    '(//XCUIElementTypeOther[@name="Healthy lifestyle"])[2]/XCUIElementTypeOther',

  CURRENT_LIFESTYLE_ANDROID:
    '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ImageView[2]',
  //'/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.ImageView[2]',
  CURRENT_LIFESTYLE_IOS:
    '(//XCUIElementTypeOther[@name="Current lifestyle"])[2]/XCUIElementTypeOther',
  SEARCH_FOR_CLINICS_BUTTON_IOS:
    '(//XCUIElementTypeOther[@name="Search for panel clinic"])[2]',
  SEARCH_FOR_CLINICS_BUTTON_ANDROID:
    '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[3]',
  GRAPHIC_RISK_NUMBER_IOS:
    '//XCUIElementTypeOther[contains(@name,"OUT OF 100")]//XCUIElementTypeStaticText',
  GRAPHIC_RISK_NUMBER_ANDROID:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.TextView[2]',

  HISTORY_GRAPH_ANDROID:
    '//android.view.ViewGroup[@content-desc="Health Score History Graph showing last 6 records."]',
  HISTORY_GRAPH_IOS: '~Health Score History Graph showing last 6 records.',
  HISTORY_GRAPH_TO_GET_HEIGHT_IOS:
    '(//XCUIElementTypeOther[@name="Health Score History Graph showing last 6 records."])[3]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]',
  LAST_BAR_HISTORY_GRAPH_IOS:
    '(//XCUIElementTypeOther[@name="Health Score History Graph showing last 6 records."])[3]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[4]',
  AGING_SLIDER_IOS:
    '(//XCUIElementTypeOther[starts-with(@name,"Future you at the age")])[1]/XCUIElementTypeSlider',
  AGING_SLIDER_ANDROID:
    '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.SeekBar',
  //'/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.SeekBar',
  BMI_HEADER_IOS: '//XCUIElementTypeStaticText[@name="BMI"]',
  BMI_RISK_SCORE_IOS: '//XCUIElementTypeStaticText[@name="118.9"]',
  BMI_RISK_STATUS_IOS: '//XCUIElementTypeStaticText[@name="Obese"]',
  BMI_RISK_STATEMENT_IOS:
    '//XCUIElementTypeStaticText[@name="You are at high risk of developing multiple health problems. Change your dietary and lifestyle habits to get healthy."]',
  DIABETES_HEADER_IOS: '//XCUIElementTypeStaticText[@name="Diabetes"]',
  DIABETES_RISK_SCORE_IOS:
    '//XCUIElementTypeImage[@name="assets/src/images/DiabetesRiskRed@2x.png"]',
  DIABETES_RISK_STATUS_IOS:
    '//XCUIElementTypeStaticText[@name="Very high risk"]',
  DIABETES_RISK_STATEMENT_IOS:
    '//XCUIElementTypeStaticText[contains(@name ,"You are potentially pre-diabetic. Early detection can guide you in changing your lifestyle and result in better outcomes")]',
  BMI_HEADER_ANDROID: 'BMI',
  BMI_RISK_SCORE_ANDROID:
  '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.HorizontalScrollView[2]/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView[1]',
  //'//android.view.ViewGroup[@content-desc="Update my lifestyle data"]/following-sibling::android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[2]',
  BMI_RISK_STATUS_ANDROID:
   '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.HorizontalScrollView[2]/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView[3]',
  //'//android.view.ViewGroup[@content-desc="Update my lifestyle data"]/following-sibling::android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[3]',
  BMI_RISK_STATEMENT_ANDROID:
    '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.HorizontalScrollView[2]/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView[4]',
  //'//android.view.ViewGroup[@content-desc="Update my lifestyle data"]/following-sibling::android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[3]',
  DIABETES_HEADER_ANDROID: 'Diabetes',
  DIABETES_RISK_SCORE_ANDROID:
    '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.HorizontalScrollView[2]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.ImageView',
  //'//android.view.ViewGroup[@content-desc="Update my lifestyle data"]/following-sibling::android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[2]',
  DIABETES_RISK_STATUS_ANDROID:
    '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.HorizontalScrollView[2]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.TextView[2]',
  //'//android.view.ViewGroup[@content-desc="Update my lifestyle data"]/following-sibling::android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[3]',
  DIABETES_RISK_STATEMENT_ANDROID:
    '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.HorizontalScrollView[2]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.TextView[3]'
  //'//android.view.ViewGroup[@content-desc="Update my lifestyle data"]/following-sibling::android.widget.HorizontalScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView[3]'
};

class HealthScreen extends AppScreen {
  constructor() {
    super(SELECTORS.HEALTH_NAVIGATOR);
    this.platform = getPlatform().toUpperCase();
  }

  get graphicRiskNumber() {
    return $(SELECTORS[`GRAPHIC_RISK_NUMBER_${this.platform}`]);
  }

  get historyGraphToGetHeight() {
    return $(SELECTORS[`HISTORY_GRAPH_TO_GET_HEIGHT_${this.platform}`]);
  }

  get lastBarHistoryGraph() {
    return $(SELECTORS[`LAST_BAR_HISTORY_GRAPH_${this.platform}`]);
  }

  get agingSlider() {
    return $(SELECTORS[`AGING_SLIDER_${this.platform}`]);
  }

  get historyGraph() {
    return $(SELECTORS[`HISTORY_GRAPH_${this.platform}`]);
  }

  get searchForClinicButton() {
    return $(SELECTORS[`SEARCH_FOR_CLINICS_BUTTON_${this.platform}`]);
  }

  get loadingIcon() {
    return $(SELECTORS[`LOADING_ICON_${this.platform}`]);
  }

  get healthyLifeStylePicture() {
    return $(SELECTORS[`HEALTHY_LIFESTYLE_${this.platform}`]);
  }

  get currentLifeStylePicture() {
    return $(SELECTORS[`CURRENT_LIFESTYLE_${this.platform}`]);
  }

  get updateHealthDataButton() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`UPDATE_HEALTH_DATA_BUTTON_IOS`]);
    } else {
      return $(txt(SELECTORS.UPDATE_HEALTH_DATA_BUTTON_ANDROID));
    }
  }

  get healthFigure() {
    return $(SELECTORS[`HEALTH_FIGURE_${this.platform}`]);
  }

  get bmiHeader() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.BMI_HEADER_IOS);
    } else {
      return $(txt(SELECTORS.BMI_HEADER_ANDROID));
    }
  }

  get bmiRiskScore() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`BMI_RISK_SCORE_IOS`]);
    } else {
      return $(SELECTORS[`BMI_RISK_SCORE_ANDROID`]);
    }
  }

  get bmiRiskStatus() {
    if (this.platform === 'IOS') {
      return $(SELECTORS[`BMI_RISK_STATUS_IOS`]);
    } else {
      return $(SELECTORS[`BMI_RISK_STATUS_ANDROID`]);
    }
  }

  get bmiRiskStatement() {
    return $(SELECTORS[`BMI_RISK_STATEMENT_${this.platform}`]);
  }

  get diabetesHeader() {
    if (this.platform === 'IOS') {
      return $(SELECTORS.DIABETES_HEADER_IOS);
    } else {
      return $(txt(SELECTORS.DIABETES_HEADER_ANDROID));
    }
  }

  get diabetesRiskScore() {
    return $(SELECTORS[`DIABETES_RISK_SCORE_${this.platform}`]);
  }

  get diabetesRiskStatus() {
    return $(SELECTORS[`DIABETES_RISK_STATUS_${this.platform}`]);
  }

  get diabetesRiskStatement() {
    return $(SELECTORS[`DIABETES_RISK_STATEMENT_${this.platform}`]);
  }

  bmiScore(score) {
    return $(txt(score));
  }

  bmiText(bmiText) {
    return $(txt(bmiText));
  }

  diabetesScore(score) {
    return $(txt(score));
  }

  diabetesText(diabetesText) {
    return $(txt(diabetesText));
  }
}

export default new HealthScreen();
