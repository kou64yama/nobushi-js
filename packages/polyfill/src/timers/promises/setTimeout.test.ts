import { setTimeout } from './setTimeout';

describe('setTimeout(delay[, value])', () => {
  beforeEach(() => {
    jest.spyOn(globalThis, 'setTimeout').mockImplementation((handler) => {
      if (typeof handler === 'function') {
        handler();
      }
      return 0;
    });
  });

  it('returns an undefined when no value given', async () => {
    const result = setTimeout(1);
    await expect(result).resolves.toBeUndefined();
  });

  it.each<[expected: unknown, value: unknown]>([
    ['foo', 'foo'],
    ['bar', 'bar'],
  ])('returns %p when the given `value` is %p', async (expected, value) => {
    const result = setTimeout(1, value);
    await expect(result).resolves.toBe(expected);
  });

  it.each<[expected: number, delay: number]>([
    [1, 1],
    [2, 2],
  ])(
    'schedules a timer after %d ms when then given `delay` is %d',
    async (expected, delay) => {
      jest.spyOn(globalThis, 'setTimeout');
      await setTimeout(delay);
      expect(globalThis.setTimeout).toBeCalledWith(expect.anything(), expected);
    },
  );
});
