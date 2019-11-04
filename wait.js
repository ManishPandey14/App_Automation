import { DEFAULT_TIMEOUT } from '../../../constants';

/**
 * API for `waitForDisplayed`
 * @param  {string}  selector
 * @return {boolean}
 */
export default function wait(selector) {
  return $(selector).waitForDisplayed(DEFAULT_TIMEOUT, false);
}
