import { loginAs, isLoggedin } from '../actions/login.action';
import { validCredentials, invalidCredentials } from '../../data/login.data';

describe('Employee should,', () => {
  it('be able to login to app with valid credentials', () => {
    loginAs(validCredentials);
    expect(isLoggedin()).toBeTruthy();
  });

  fit('not be able to login to application with invalid credentials', () => {
    loginAs(invalidCredentials);
    //expect(login.isLoginErrorMessageVisible()).toBeTruthy();
  });

  afterEach(() => {
    driver.reset();
  });
});
