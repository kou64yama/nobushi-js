/**
 * Returns an async iterator that generates values in an interval of `delay` ms.
 *
 * For example:
 *
 * ```ts
 * import { setInterval } from '@nobushi/polyfill/timers/promises';
 *
 * const interval = 100;
 * for await (const startTime of setInterval(interval, Date.now())) {
 *   const now = Date.now();
 *   console.log(now);
 *   if ((now - startTime) > 1000)
 *     break;
 * }
 * console.log(Date.now());
 * ```
 *
 * @param delay The number of milliseconds to wait between iterations. **Default: `1`**.
 * @param value A value with which the iterator returns.
 * @see https://nodejs.org/docs/latest-v16.x/api/timers.html#timerspromisessetintervaldelay-value-options
 */
export const setInterval = <T = undefined>(
  delay?: number,
  value?: T,
): AsyncIterable<T> => {
  throw new Error('not implemented');
};
