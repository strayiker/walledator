import Base from '..';

describe('Base.createDefinition', () => {
  it('should throw an exception if invalid arguments were passed', () => {
    const validator = new Base();
    const invalidArguments = [1, true, null, undefined, 'value', []];

    invalidArguments.map(value =>
      expect(() => validator.createDefinition(value)).toThrowError(
        'The "options" must be a plain object or a function.'
      )
    );

    const fn = () => {};
    const invalid1 = {};
    const invalid2 = { check: fn, skipUndefined: 1 };
    const invalid3 = {
      check: fn,
      skipUndefined: false,
      negate: 1,
    };
    const invalid4 = { key: 1, check: fn };

    expect(() => validator.createDefinition(invalid1)).toThrowError(
      'The "check" function is required.'
    );
    expect(() => validator.createDefinition(invalid2)).toThrowError(
      'The "skipUndefined" must be a boolean.'
    );
    expect(() => validator.createDefinition(invalid3)).toThrowError(
      'The "negate" must be a boolean.'
    );
    expect(() => validator.createDefinition(invalid4)).toThrowError(
      'The "key" must be a string or undefined.'
    );
  });

  it('should return a new check definition', () => {
    const validator = new Base();
    const check = () => {};

    let definition = validator.createDefinition(check);

    expect(definition).toMatchObject({
      check,
      args: [],
      negate: false,
      skipUndefined: true,
    });

    const options = {
      check,
      args: [{ someProperty: 1 }],
      negate: true,
      skipUndefined: false,
    };

    definition = validator.createDefinition(options);

    expect(definition).toMatchObject(options);
  });

  it('should set the "negate" property equal to "negateNext"', () => {
    const validator = new Base();
    let result;

    validator.negateNext = true;
    result = validator.createDefinition({
      check: () => {},
    });

    expect(result).toMatchObject({
      negate: true,
    });

    validator.negateNext = true;
    result = validator.createDefinition({
      check: () => {},
      negate: false,
    });

    expect(result).toMatchObject({
      negate: false,
    });
  });

  it('should reset the "negateNext" property', () => {
    const validator = new Base();

    validator.negateNext = true;
    validator.createDefinition(() => {});

    expect(validator.negateNext).toBe(false);
  });
});
