const SELECTORS = {
  ANDROID: {
    ALERT_TITLE:
      '*//android.widget.TextView[@resource-id="android:id/alertTitle"]',
    ALERT_MESSAGE:
      '*//android.widget.TextView[@resource-id="android:id/message"]',
    ALERT_BUTTON: '*//android.widget.Button[@text="{BUTTON_TEXT}"]'
  },
  IOS: {
    ALERT: '*//XCUIElementTypeAlert'
  }
};

export const waitForAlertToVisible = {
  Android: () => {
    const selector = SELECTORS.ANDROID.ALERT_TITLE;
    $(selector).waitForExist(11000, false);
  },
  iOS: () => {
    const selector = SELECTORS.IOS.ALERT;
    $(selector).waitForExist(11000, false);
  }
};

export const text = {
  Android: () => {
    return `${$(SELECTORS.ANDROID.ALERT_TITLE).getText()}\n${$(
      SELECTORS.ANDROID.ALERT_MESSAGE
    ).getText()}`;
  },
  iOS: () => {
    return driver.getAlertText();
  }
};
