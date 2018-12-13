import Base from '..';

describe('Base.then', () => {
  it('should create a new empty cascade', () => {
    const fn = () => {};
    const validator = new Base();
    validator.addCheck(fn);

    expect(validator.cascades).toHaveLength(1);

    // eslint-disable-next-line no-unused-expressions
    validator.then;

    expect(validator.cascades).toHaveLength(2);
    expect(validator.cascades[1]).toEqual([]);
  });

  it('should`t create a new cascade if the last one is empty', () => {
    const validator = new Base();

    expect(validator.cascades).toHaveLength(1);
    expect(validator.cascades).toEqual([[]]);

    // eslint-disable-next-line no-unused-expressions
    validator.then;

    expect(validator.cascades).toHaveLength(1);
  });

  it('should clear the "current"', () => {
    const validator = new Base();

    validator.current = {};
    // eslint-disable-next-line no-unused-expressions
    validator.then;

    expect(validator.current).toBeNull();
  });

  it('should return "this"', () => {
    const validator = new Base();

    expect(validator.then).toBe(validator);
  });
});
