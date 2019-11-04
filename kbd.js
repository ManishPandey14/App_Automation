import tap from './tap';
import getPlatform from './platform';

/**
 * Keyboard actions (currently onlt hide action)
 * @param  {string}    action
 * @param  {Array?}    xy
 * @return {undefined}
 */
export default function kbd(action, xy) {
  xy = xy || [100, 100];

  const platform = getPlatform();

  if (action === 'hide') {
    if (platform === 'ios') {
      tap(...xy);
    } else if (platform === 'android') {
      driver.hideKeyboard();
    }
  }
}
