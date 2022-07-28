import { setInterval } from './setInterval';

describe('setInterval(delay[, value])', () => {
  beforeEach(() => {
    jest.spyOn(globalThis, 'setTimeout').mockImplementation((handler) => {
      if (typeof handler === 'function') {
        handler();
      }
      return 0;
    });
  });

  it('returns an AsyncIterable instance that returns undefined infinitely when no `value` given', async () => {
    const result = setInterval(1);
    const iterator = result[Symbol.asyncIterator]();
    await expect(iterator.next()).resolves.toEqual({
      value: undefined,
      done: false,
    });
    await expect(iterator.next()).resolves.toEqual({
      value: undefined,
      done: false,
    });
    await expect(iterator.next()).resolves.toEqual({
      value: undefined,
      done: false,
    });
  });

  it.each<[expected: unknown, value: unknown]>([
    ['foo', 'foo'],
    ['bar', 'bar'],
  ])(
    'returns an AsyncIterable instance that returns %p infinitely when the given `value` is %p',
    async (expected, value) => {
      const result = setInterval(1, value);
      const iterator = result[Symbol.asyncIterator]();
      await expect(iterator.next()).resolves.toEqual({
        value: expected,
        done: false,
      });
      await expect(iterator.next()).resolves.toEqual({
        value: expected,
        done: false,
      });
      await expect(iterator.next()).resolves.toEqual({
        value: expected,
        done: false,
      });
    },
  );
});
