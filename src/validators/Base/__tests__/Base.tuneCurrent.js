import Base from '..';

describe('Base.tuneCurrent', () => {
  it('should throw an exception if no current check', () => {
    const validator = new Base();

    expect(() => validator.tuneCurrent()).toThrowError(
      'Define a check before configure it.'
    );
  });

  it('should update "args" of the last check', () => {
    const validator = new Base({
      check: () => {},
      argsCount: 1,
    });
    const { current } = validator;

    expect(current).toHaveProperty('message', undefined);

    const args = {
      someProperty: 1,
    };

    validator.tuneCurrent([args]);

    expect(current).toHaveProperty('message', undefined);
    expect(current.args).toMatchObject([args]);
  });

  it('should return "this"', () => {
    const validator = new Base(() => {});
    const result = validator.tuneCurrent([{}]);

    expect(result).toBe(validator);
  });
});
