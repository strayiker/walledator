import Base from '..';

describe('Base.check', () => {
  it('should skip validation of "undefined" if the "allowUndefined" = true', async () => {
    const check = jest.fn();
    const validator = new Base();
    const result = await validator.check(undefined, {
      check,
      allowUndefined: true,
    });

    expect(result).toBe(null);
    expect(check).not.toHaveBeenCalled();
  });

  it('should call the "check" function', async () => {
    const check = jest.fn().mockReturnValue(1);
    const validator = new Base();

    validator.setOptions({
      option: 'option',
    });

    const result = await validator.check('value', {
      check,
      args: [{ some: 1 }],
      message: 'test',
    });

    expect(check).toHaveBeenCalledWith(
      'value',
      { some: 1 },
      { option: 'option' }
    );
    expect(check).toHaveBeenCalledTimes(1);
    expect(result).toBe('test');
  });

  it('should call the "message" function', async () => {
    const message = jest.fn();
    const validator = new Base();

    const check = {
      check: () => 'result',
      args: [{ some: 1 }],
      message,
    };

    await validator.check('value', check);

    expect(message).toHaveBeenCalledWith({ some: 1 }, 'result');
    expect(message).toHaveBeenCalledTimes(1);
  });

  it('should negate check result if "negate" option is true', async () => {
    const validator = new Base();

    const result = await validator.check(false, {
      check: value => !value,
      negate: true,
    });

    expect(result).toBe(null);
  });

  it('should return an error if check has failed', async () => {
    const validator = new Base();

    const check = jest
      .fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce('test')
      .mockReturnValueOnce({})
      .mockReturnValueOnce([])
      .mockReturnValueOnce(() => {})
      .mockReturnValueOnce(false);

    const definition = {
      check,
      message: 'test',
    };

    const results = [];

    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));
    results.push(await validator.check('value', definition));

    expect(results).toHaveLength(6);
    expect(results).toContain('test');
  });
});
