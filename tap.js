/**
 * Tap
 * @param  {number}    x
 * @param  {number}    y
 * @return {undefined}
 */
export default function tap(x, y) {
  driver.touchPerform([
    { action: 'tap', options: { x, y } },
    { action: 'release' }
  ]);
}
