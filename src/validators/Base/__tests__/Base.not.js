import Base from '..';

describe('Base.not', () => {
  it('should set the property "negateNext" into true', () => {
    const validator = new Base();

    // eslint-disable-next-line no-unused-expressions
    validator.not;

    expect(validator.negateNext).toBe(true);
  });

  it('should reset the property "current"', () => {
    const validator = new Base();

    // eslint-disable-next-line no-unused-expressions
    validator.not;

    expect(validator.current).toBeNull();
  });

  it('should return "this"', () => {
    const validator = new Base();
    // eslint-disable-next-line no-unused-expressions
    const result = validator.not;

    expect(result).toBe(validator);
  });
});
