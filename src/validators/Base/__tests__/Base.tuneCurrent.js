import Base from '..';

describe('Base.tuneCurrent', () => {
  it('should throw an exception if no current check', () => {
    const validator = new Base();

    expect(() => validator.tuneCurrent()).toThrowError(
      'Choose a check before configure it.'
    );
  });

  it('should update "args" of current check', () => {
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

  it('should update "message" of current check', () => {
    const validator = new Base(() => {});
    const current1 = validator.current;

    expect(current1).toHaveProperty('message', undefined);

    validator.tuneCurrent(['test']);

    expect(current1).toHaveProperty('message', 'test');

    validator.addCheck(() => {});
    const current2 = validator.current;

    expect(current2).toHaveProperty('message', undefined);

    validator.tuneCurrent([() => 'test1']);

    expect(current2.message()).toBe('test1');
  });

  it('should return "this"', () => {
    const validator = new Base(() => {});
    const result = validator.tuneCurrent([{}]);

    expect(result).toBe(validator);
  });
});
