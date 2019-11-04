import { swipeUp, swipeDown } from './swipe';
import getPlatform from './platform';

function noop() {}

/**
 * Scroll
 * @param  {Object}   options
 * @param  {Function} cb
 * @return {Function}
 */
export default function scroll(options, cb) {
  const platform = getPlatform();

  if (platform === 'ios') {
    driver.execute('mobile:scroll', options);
  } else if (platform === 'android') {
    $(
      `android=new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().textContains("**/${options.text}/**").instance(0))`
    );
  }

  return typeof cb === 'function' ? cb() : noop;
}

export function checkIfDisplayedWithScrollDown(
  element,
  maxScrolls,
  amount = 0
) {
  if (
    (!element.isExisting() || !element.isDisplayed()) &&
    amount <= maxScrolls
  ) {
    swipeUp(0.5);
    checkIfDisplayedWithScrollDown(element, maxScrolls, amount + 1);
  } else if (amount > maxScrolls) {
    throw new Error(
      `The element '${element}' could not be found or is not visible.`
    );
  }
}

export function checkIfDisplayedWithScrollUp(element, maxScrolls, amount = 0) {
  if (
    (!element.isExisting() || !element.isDisplayed()) &&
    amount <= maxScrolls
  ) {
    swipeDown(1.1);
    checkIfDisplayedWithScrollUp(element, maxScrolls, amount + 1);
  } else if (amount > maxScrolls) {
    throw new Error(
      `The element '${element}' could not be found or is not visible.`
    );
  }
}
