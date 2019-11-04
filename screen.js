import { compose } from 'ramda';
import wait from './wait';
import txt from '../text';

/**
 * Wait for screen appearing (e.g for navi title)
 * @param  {string}  text
 * @return {boolean}
 */
export default function screen(text) {
  return compose(
    wait,
    txt
  )(text);
}
