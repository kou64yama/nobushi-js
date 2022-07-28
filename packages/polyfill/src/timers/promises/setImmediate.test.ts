import { setImmediate } from './setImmediate';

describe('setImmediate([value])', () => {
  beforeEach(() => {
    jest.spyOn(globalThis, 'setTimeout').mockImplementation((handler) => {
      if (typeof handler === 'function') {
        handler();
      }
      return 0;
    });
  });

  it('returns undefined when no `value` given', async () => {
    const result = setImmediate();
    await expect(result).resolves.toBeUndefined();
  });

  it.each<[expected: unknown, value: unknown]>([
    ['foo', 'foo'],
    ['bar', 'bar'],
  ])('returns %p when the given `value` is %p', async (expected, value) => {
    const result = setImmediate(value);
    await expect(result).resolves.toBe(expected);
  });

  it('schedules a timer after 1 ms', async () => {
    jest.spyOn(globalThis, 'setTimeout');
    await setImmediate();
    expect(globalThis.setTimeout).toBeCalledWith(expect.anything(), 1);
  });
});
