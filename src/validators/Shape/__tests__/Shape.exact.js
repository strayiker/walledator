import Shape from '..';

describe('Shape.exact', () => {
  it('should set the "exact" options to true', () => {
    const validator = new Shape();

    expect(validator.options.exact).toBe(undefined);

    // eslint-disable-next-line no-unused-expressions
    validator.exact;

    expect(validator.options.exact).toBe(true);
  });
});
