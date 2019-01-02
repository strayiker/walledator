import size from '../size';

describe('size()', () => {
  it('expects that the "options" argument will be a number or a plain object', () => {
    const invalid = ['', true, false, undefined, null, NaN, [], () => {}];

    invalid.forEach(options => {
      expect(() => size('value', options)).toThrowError(
        'The "limit" should be a number or a plain object.'
      );
    });
  });

  it('should throw an exception if min > max', () => {
    const fn = () => size('value', { min: 10, max: 5 });

    expect(fn).toThrow('The "max" should be less or equal "min".');
  });

  it('should check that the size of the value match the limits', () => {
    const invalid = [1, true, false, undefined, null, NaN, {}, () => {}];
    const valid = ['val', '💩💩💩', [1, 2, 3]];

    invalid.forEach(value => {
      expect(size(value, 3)).toBe(true);
      expect(size(value, { min: 3, max: 10 })).toBe(true);
    });

    valid.forEach(value => {
      expect(size(value, 3)).toBe(false);
      expect(size(value, 1)).toBe(1);
      expect(size(value, 5)).toBe(5);

      expect(size(value, { min: 1 })).toBe(false);
      expect(size(value, { min: 3 })).toBe(false);
      expect(size(value, { max: 3 })).toBe(false);
      expect(size(value, { max: 5 })).toBe(false);
      expect(size(value, { min: 1, max: 5 })).toBe(false);
      expect(size(value, { min: 3, max: 3 })).toBe(false);

      expect(size(value, { min: 5 })).toEqual({ min: 5, max: Infinity });
      expect(size(value, { max: 1 })).toEqual({ min: 0, max: 1 });
      expect(size(value, { min: 5, max: 5 })).toEqual({ min: 5, max: 5 });
      expect(size(value, { min: 1, max: 1 })).toEqual({ min: 1, max: 1 });
    });
  });
});
