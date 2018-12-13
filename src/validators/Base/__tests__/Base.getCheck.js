import Base from '..';

describe('Base.getCheck', () => {
  it('should return a check that match the provided key', () => {
    const check = {
      key: 'check',
      check: () => {},
    };
    const validator = new Base(check);
    const res = validator.getCheck('check');

    expect(res.key).toBe(check.key);
  });
});
