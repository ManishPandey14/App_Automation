import { screen } from './api';

function noop() {}

/**
 * Create step with screen name
 * @param  {string}   name
 * @param  {Function} cb
 * @return {Function}
 */
export default function navi(name, cb) {
  screen(name);

  return typeof cb === 'function' ? cb() : noop;
}
