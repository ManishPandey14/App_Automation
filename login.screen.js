import AppScreen from './app.screen';

const SELECTORS = {
  LOGIN_SCREEN: '~Company name',
  COMPANY_NAME: '~Company name',
  EMAIL_ADDRESS: '~Email address',
  PASSWORD: '~Password',
  LOGIN_BUTTON: '~Log in'
};

class LoginScreen extends AppScreen {
  constructor() {
    super(SELECTORS.LOGIN_SCREEN);
  }

  companyNameField() {
    return $(SELECTORS.COMPANY_NAME);
  }

  emailAddressField() {
    return $(SELECTORS.EMAIL_ADDRESS);
  }

  passwordField() {
    return $(SELECTORS.PASSWORD);
  }

  loginButton() {
    return $(SELECTORS.LOGIN_BUTTON);
  }
}

export default new LoginScreen();
