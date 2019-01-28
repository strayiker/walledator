import Number from '..';

describe('Number', () => {
  it('should check that the value is a number', async () => {
    const validator = new Number();

    const result1 = await validator.validate(1);

    expect(result1).toBeNull();

    const result2 = await validator.validate('');
    const result3 = await validator.validate(null);
    const result4 = await validator.validate(true);
    const result5 = await validator.validate(false);
    const result6 = await validator.validate({});
    const result7 = await validator.validate([]);
    const result8 = await validator.validate(() => {});

    expect(result2).toEqual({ id: 0, result: true });
    expect(result3).toEqual({ id: 0, result: true });
    expect(result4).toEqual({ id: 0, result: true });
    expect(result5).toEqual({ id: 0, result: true });
    expect(result6).toEqual({ id: 0, result: true });
    expect(result7).toEqual({ id: 0, result: true });
    expect(result8).toEqual({ id: 0, result: true });
  });
});
