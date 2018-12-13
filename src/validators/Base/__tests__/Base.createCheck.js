import Base from '..';

describe('Base.createCheck', () => {
  it('should throw an exception if invalid arguments were passed', () => {
    const validator = new Base();
    const invalidArguments = [1, true, null, undefined, 'value', []];

    invalidArguments.map(value =>
      expect(() => validator.createCheck(value)).toThrowError(
        'QQ: Check options must be a plain object or a function.'
      )
    );

    const fn = () => {};
    const invalid1 = {};
    const invalid2 = { check: fn, message: 1 };
    const invalid3 = { check: fn, message: '', allowUndefined: 1 };
    const invalid4 = {
      check: fn,
      message: '',
      allowUndefined: false,
      negate: 1,
    };
    const invalid5 = { key: 1, check: fn };

    expect(() => validator.createCheck(invalid1)).toThrowError(
      'QQ: The "check" function is required.'
    );
    expect(() => validator.createCheck(invalid2)).toThrowError(
      'QQ: The "message" must be one of next types: string, function, undefined.'
    );
    expect(() => validator.createCheck(invalid3)).toThrowError(
      'QQ: The "allowUndefined" must be a boolean.'
    );
    expect(() => validator.createCheck(invalid4)).toThrowError(
      'QQ: The "negate" must be a boolean.'
    );
    expect(() => validator.createCheck(invalid5)).toThrowError(
      'QQ: The "key" must be a string or undefined.'
    );
  });

  it('should return a new check definition', () => {
    const validator = new Base();
    const check = () => {};

    let definition = validator.createCheck(check);

    expect(definition).toMatchObject({
      check,
      args: [],
      argsCount: 0,
      negate: false,
      allowUndefined: true,
      message: undefined,
      defaultMessage: undefined,
    });

    const options = {
      check,
      args: [{ someProperty: 1 }],
      argsCount: 1,
      negate: true,
      allowUndefined: false,
      message: 'test',
      defaultMessage: 'test',
    };

    definition = validator.createCheck(options);

    expect(definition).toMatchObject(options);
  });

  it('should set the "negate" property equal to "negateNext"', () => {
    const validator = new Base();
    let result;

    validator.negateNext = true;
    result = validator.createCheck({
      check: () => {},
    });

    expect(result).toMatchObject({
      negate: true,
    });

    validator.negateNext = true;
    result = validator.createCheck({
      check: () => {},
      negate: false,
    });

    expect(result).toMatchObject({
      negate: false,
    });
  });
});
