import { setTimeout } from './setTimeout';

/**
 * For example:
 *
 * ```ts
 * import { setImmediate } from '@nobushi/polyfill/timers/promises';
 *
 * const res = await setImmediate('result');
 *
 * console.log(res);  // Prints 'result'
 * ```
 *
 * @param value A value with which the promise is fulfilled.
 * @see https://nodejs.org/docs/latest-v16.x/api/timers.html#timerspromisessetimmediatevalue-options
 */
export const setImmediate = async <T = undefined>(value?: T): Promise<T> => {
  return await setTimeout(1, value);
};
