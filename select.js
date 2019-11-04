import wait from './wait';

/**
 * Select input
 * @param  {Element}  selectEl
 * @param  {string}   pageSelector
 * @return {Function}
 */
export default function select(selectSelector, pageSelector) {
  /**
   * @param  {string}  pageSelector
   * @return {Element}
   */
  return (optionSelector) => {
    $(selectSelector).click();
    wait(pageSelector);
    $(optionSelector).click();

    return $(selectSelector);
  };
}
