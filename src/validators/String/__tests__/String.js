import String from '..';

describe('String', () => {
  it('should check that the value is a string', async () => {
    const validator = new String();

    const invalid = [1, null, true, false, NaN, {}, [], () => {}];

    invalid.map(async value => {
      const res = await validator.validate(value);
      expect(res).toBe('must be a string.');
    });

    const res = await validator.validate('string');
    expect(res).toBe(null);
  });
});
