import wait from './wait';
import getPlatform from './platform';

const SELECTOR = {
  ios: '~header-back',
  android: '//android.widget.Button[@content-desc="Go back"]'
};

/**
 * Back button
 * @param  {boolean?}  [willWait=false]
 * @return {undefined}
 */
export default function back(willWait = false) {
  const platform = getPlatform();

  if (willWait) {
    wait(SELECTOR[platform]);
  }

  $(SELECTOR[platform]).click();
}
