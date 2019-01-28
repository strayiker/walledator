import Base from '..';

describe('Base.check', () => {
  it('should skip validation of "undefined" if the "skipUndefined" is true', async () => {
    const check = jest.fn();
    const validator = new Base();
    const result = await validator.check(undefined, {
      check,
      skipUndefined: true,
    });

    expect(result).toBeNull();
    expect(check).not.toBeCalled();
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

    expect(check).toBeCalledTimes(1);
    expect(check).toBeCalledWith(
      'value',
      [{ arg: 1 }],
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

    expect(result).toBeNull();
  });

  it('should return error if check has failed', async () => {
    const validator = new Base();
    const values = [1, '1', {}, [], () => {}, true];

    return Promise.all(
      values.map(async v => {
        const result = await validator.check('value', {
          id: 0,
          check: () => v,
        });
        expect(result).toEqual({ id: 0, result: v });
      })
    );
  });
});
