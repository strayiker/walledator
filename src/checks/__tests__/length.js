import length from '../length';

describe('length()', () => {
  it('expects that the "options" argument will be a number or a plain object', () => {
    const invalid = ['', true, false, undefined, null, NaN, [], () => {}];

    invalid.forEach(options => {
      expect(() => length('value', options)).toThrowError(
        'QQ: The argument "limit" should be a number or a plain object.'
      );
    });
  });

  it('should throw an exception if min > max', () => {
    const fn = () => length('value', { min: 10, max: 5 });

    expect(fn).toThrow(
      'QQ: Maximum length of the value can not be less then minimum.'
    );
  });

  it('should check that the length of the value match the limits', () => {
    const invalid = [1, true, false, undefined, null, NaN, {}, () => {}];
    const valid = ['val', '💩💩💩', [1, 2, 3]];

    invalid.forEach(value => {
      expect(length(value, 3)).toBe(true);
      expect(length(value, { min: 3, max: 10 })).toBe(true);
    });

    valid.forEach(value => {
      expect(length(value, 3)).toBe(false);
      expect(length(value, 1)).toBe(1);
      expect(length(value, 5)).toBe(5);

      expect(length(value, { min: 1 })).toBe(false);
      expect(length(value, { min: 3 })).toBe(false);
      expect(length(value, { max: 3 })).toBe(false);
      expect(length(value, { max: 5 })).toBe(false);
      expect(length(value, { min: 1, max: 5 })).toBe(false);
      expect(length(value, { min: 3, max: 3 })).toBe(false);

      expect(length(value, { min: 5 })).toEqual({ min: 5, max: Infinity });
      expect(length(value, { max: 1 })).toEqual({ min: 0, max: 1 });
      expect(length(value, { min: 5, max: 5 })).toEqual({ min: 5, max: 5 });
      expect(length(value, { min: 1, max: 1 })).toEqual({ min: 1, max: 1 });
    });
  });
});
