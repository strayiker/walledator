import Base from '..';

describe('Base.check', () => {
  it('should skip validation of "undefined" if the "skipUndefined" is true', async () => {
    const check = jest.fn();
    const validator = new Base();
    const result = await validator.check(undefined, {
      check,
      skipUndefined: true,
    });

    expect(result).toBe(null);
    expect(check).not.toHaveBeenCalled();
  });

  it('should call the "check" function', async () => {
    const check = jest.fn().mockReturnValue(true);
    const validator = new Base();
    const definition = {
      id: 0,
      key: 'key',
      check,
      args: [{ arg: 1 }],
      argsCount: 1,
    };

    await validator.check(
      'value',
      definition,
      { option: 'option' },
      { context: {} }
    );

    expect(check).toHaveBeenCalledTimes(1);
    expect(check).toHaveBeenCalledWith(
      'value',
      { arg: 1 },
      { option: 'option' },
      { context: {}, path: ['key'] }
    );
  });

  it('should negate check result if the "negate" option is true', async () => {
    const validator = new Base();

    const result = await validator.check(false, {
      check: value => !value,
      negate: true,
    });

    expect(result).toBe(null);
  });

  it('should return error if check has failed', async () => {
    const validator = new Base();
    const values = [1, 'test', {}, [], () => {}, true];
    const check = jest.fn();

    values.forEach(value => check.mockReturnValueOnce(value));

    const definition = {
      id: 0,
      check,
      args: [],
      argsCount: 0,
      message: 'test',
    };

    validator.definitions.push(definition);

    const results = [];

    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));

    expect(results).toHaveLength(6);
    expect(results).toEqual(['test', 'test', 'test', 'test', 'test', 'test']);
  });
});
