import Bool from '..';

describe('Bool', () => {
  it('should check that the value is a boolean', async () => {
    const validator = new Bool();

    const invalid = [1, '', null, NaN, {}, [], () => {}];

    invalid.map(async value => {
      const res = await validator.validate(value);
      expect(res).toBe('must be a boolean.');
    });

    const res1 = await validator.validate(true);
    const res2 = await validator.validate(false);

    expect(res1).toBe(null);
    expect(res2).toBe(null);
  });
});
