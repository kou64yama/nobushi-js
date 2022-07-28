/**
 * For example:
 *
 * ```ts
 * import { setTimeout } from '@nobushi/polyfill/timers/promises';
 *
 * const res = await setTimeout(100, 'result');
 *
 * console.log(res);  // Prints 'result'
 * ```
 *
 * @param delay The number of milliseconds to wait before fulfilling the promise. **Default: `1`**.
 * @param value A value with which the promise is fulfilled.
 * @see https://nodejs.org/docs/latest-v16.x/api/timers.html#timerspromisessettimeoutdelay-value-options
 */
export const setTimeout = async <T = undefined>(
  delay?: number,
  value?: T,
): Promise<T> => {
  throw new Error('not implemented');
};
