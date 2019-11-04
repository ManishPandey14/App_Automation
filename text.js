import { compose } from 'ramda';
import { platform as getPlatform } from './api';

const PREFIX = {
  ios: '-ios predicate string:',
  android: 'android='
};

const TYPES = {
  ios: 'XCUIElementTypeOther',
  android: 'android.widget.TextView'
};

function txt(text, type) {
  const platform = getPlatform();
  const prefix = PREFIX[platform];
  let selector;

  type = type || TYPES[platform];

  if (platform === 'ios') {
    selector = `type == '${type}' && (name CONTAINS '${text}' || value CONTAINS '${text}')`;
  } else if (platform === 'android') {
    selector = `new UiSelector().text("${text}").className("${type}")`;
  }
  return `${prefix}${selector}`;
}

export function txtTo(selector, type) {
  const platform = getPlatform();

  if (platform === 'android') {
    return txt(selector, type);
  }

  return `~${selector}`;
}

export const $txt = compose(
  $,
  txt
);

export default txt;
