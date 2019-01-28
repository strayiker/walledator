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

    expect(options1).toBeCalledTimes(1);
    expect(options2.check).toBeCalledWith(
      1,
      [{ some: 1 }],
      {},
      { path: ['key'] }
    );
    expect(options2.check).toBeCalledTimes(1);
    expect(options3).toBeCalledTimes(1);
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

    expect(check1).toBeCalledTimes(1);

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

    expect(result).toBeNull();
  });

  it('should return errors for all failed checks', async () => {
    const validator = new Base();
    const check1 = jest.fn().mockReturnValue(null);
    const check2 = jest.fn().mockReturnValue(true);
    const check3 = jest.fn().mockReturnValue(true);

    validator.addCheck(check1);
    validator.addCheck(check2);
    validator.addCheck(check3);

    const result = await validator.validate(1);

    expect(result).toEqual([{ id: 1, result: true }, { id: 2, result: true }]);
  });
});
