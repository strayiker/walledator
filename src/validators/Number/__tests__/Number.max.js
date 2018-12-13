import Number from '..';

describe('Number.max', () => {
  it('should check that the value is less or equal maximum', async () => {
    const validator = new Number();

    validator.max(5);

    const res1 = await validator.validate(0);
    const res2 = await validator.validate(5);
    const res3 = await validator.validate(10);

    expect(res1).toBe(null);
    expect(res2).toBe(null);
    expect(res3).toBe('must be less or equal to 5');
  });
});
