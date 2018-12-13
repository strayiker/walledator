const Any = require('..');

describe('Any', () => {
  it('should pass any value', () => {
    const validator = new Any();
    const values = [
      1,
      'string',
      true,
      false,
      null,
      undefined,
      NaN,
      {},
      [],
      () => {},
    ];

    values.map(async value => {
      const res = await validator.validate(value);
      expect(res).toBe(null);
    });
  });
});
