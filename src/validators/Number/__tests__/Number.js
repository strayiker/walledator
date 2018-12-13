import Number from '..';

describe('Number', () => {
  it('should check that the value is a number', async () => {
    const validator = new Number();
    const invalid = ['', null, true, false, {}, [], () => {}];

    invalid.map(async value => {
      const res = await validator.validate(value);
      expect(res).toBe('must be a number.');
    });

    const res = await validator.validate(1);
    expect(res).toBe(null);
  });
});
