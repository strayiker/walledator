import Base from '..';

describe('Base.validate', () => {
  it('should run all checks', async () => {
    const validator = new Base();
    const options1 = jest.fn().mockReturnValue(false);
    const options2 = {
      key: 'key',
      check: jest.fn().mockReturnValue(false),
      args: [{ some: 1 }],
    };
    const options3 = jest.fn().mockReturnValue(true);

    validator.addCheck(options1);
    validator.addCheck(options2);
    // eslint-disable-next-line no-unused-expressions
    validator.cascade;
    validator.addCheck(options3);

    await validator.validate(1);

    expect(options1).toHaveBeenCalledTimes(1);
    expect(options2.check).toBeCalledWith(
      1,
      { some: 1 },
      {},
      { messages: {}, path: ['key'] }
    );
    expect(options2.check).toHaveBeenCalledTimes(1);
    expect(options3).toHaveBeenCalledTimes(1);
  });

  it('should stop iterating over the cascades if the current cascade return an error', async () => {
    const validator = new Base();
    const check1 = jest.fn().mockReturnValue('error');
    const check2 = jest.fn().mockReturnValue(false);

    validator.addCheck(check1);
    // eslint-disable-next-line no-unused-expressions
    validator.then;
    validator.addCheck(check2);

    await validator.validate(1);

    expect(check1).toHaveBeenCalledTimes(1);

    expect(check2).not.toBeCalled();
  });

  it('should return an empty array if all checks completed successfully', async () => {
    const validator = new Base();
    const check1 = jest.fn().mockReturnValue(null);
    const check2 = {
      check: jest.fn().mockReturnValue(null),
    };
    const check3 = jest.fn().mockReturnValue(null);

    validator.addCheck(check1);
    validator.addCheck(check2);
    // eslint-disable-next-line no-unused-expressions
    validator.cascade;
    validator.addCheck(check3);

    const result = await validator.validate(1);

    expect(result).toBe(null);
  });

  it('should return messages for all failed checks', async () => {
    const validator = new Base();
    const check1 = jest.fn().mockReturnValue(null);
    const check2 = {
      check: jest.fn().mockReturnValue(true),
      message: 'error1',
    };
    const check3 = {
      check: jest.fn().mockReturnValue(true),
      message: 'error2',
    };
    const check4 = {
      key: 'key',
      check: jest.fn().mockReturnValue(true),
    };

    validator.addCheck(check1);
    validator.addCheck(check2);
    validator.addCheck(check3);
    validator.addCheck(check4);

    validator.extendMessages({
      key: 'error3',
    });

    const result1 = await validator.validate(1, {});
    const result2 = await validator.validate(1, { transformErrors: false });

    expect(result1).toEqual(['error1', 'error2', 'error3']);
    expect(result2).toEqual([
      {
        id: 1,
        result: true,
      },
      {
        id: 2,
        result: true,
      },
      {
        id: 3,
        result: true,
      },
    ]);
  });
});
