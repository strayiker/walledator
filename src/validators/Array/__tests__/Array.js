import Array from '..';

describe('Array', () => {
  it('should check that the value is an array', async () => {
    const validator = new Array();

    const invalid = [1, '', null, true, false, NaN, {}, () => {}];

    invalid.map(async value => {
      const res = await validator.validate(value);
      expect(res).toBe('must be an array.');
    });

    const res = await validator.validate([1, 2, 3]);
    expect(res).toBe(null);
  });
});
