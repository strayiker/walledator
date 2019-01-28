import Number from '..';

describe('Number.max', () => {
  it('should check that the value is less or equal maximum', async () => {
    const validator = new Number();

    validator.max(5);

    const result1 = await validator.validate(0);
    const result2 = await validator.validate(5);
    const result3 = await validator.validate(10);

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toEqual({ id: 1, result: 5 });
  });
});
