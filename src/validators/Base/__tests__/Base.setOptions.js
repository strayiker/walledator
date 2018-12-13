import Base from '..';

describe('Base.setOptions', () => {
  it('should merge the options with exists options', () => {
    const validator = new Base();

    expect(validator.options).toEqual({});

    validator.setOptions({
      option1: 1,
      option2: 2,
    });

    expect(validator.options).toEqual({
      option1: 1,
      option2: 2,
    });

    validator.setOptions({
      option1: 2,
      option3: 3,
    });

    expect(validator.options).toEqual({
      option1: 2,
      option2: 2,
      option3: 3,
    });
  });

  it('should check that "options" is a plain object', () => {
    const validator = new Base();
    const invalid = [
      1,
      'string',
      true,
      false,
      null,
      undefined,
      NaN,
      [],
      () => {},
    ];

    invalid.forEach(options => {
      expect(() => validator.setOptions(options)).toThrowError(
        'QQ: The "options" must be a plain object.'
      );
    });
  });
});
