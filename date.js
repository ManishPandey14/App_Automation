import getPlatform from './platform';
import txt from '../text';

/**
 * Input to open native date
 * @param  {string}    action
 * @param  {string}    el
 * @return {undefined}
 */
export default function date(action, dateSelector) {
  const platform = getPlatform();

  $(dateSelector).click();

  if (action === 'toggle') {
    const selector =
      platform === 'ios' ? '~Confirm' : txt('OK', 'android.widget.Button');

    $(selector).click();
  }
}
