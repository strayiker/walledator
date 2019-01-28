import String from '..';

describe('String', () => {
  it('should check that the value is a string', async () => {
    const validator = new String();

    const result1 = await validator.validate(1);
    const result2 = await validator.validate(null);
    const result3 = await validator.validate(true);
    const result4 = await validator.validate(false);
    const result5 = await validator.validate(NaN);
    const result6 = await validator.validate({});
    const result7 = await validator.validate([]);
    const result8 = await validator.validate(() => {});

    expect(result1).toEqual({ id: 0, result: true });
    expect(result2).toEqual({ id: 0, result: true });
    expect(result3).toEqual({ id: 0, result: true });
    expect(result4).toEqual({ id: 0, result: true });
    expect(result5).toEqual({ id: 0, result: true });
    expect(result6).toEqual({ id: 0, result: true });
    expect(result7).toEqual({ id: 0, result: true });
    expect(result8).toEqual({ id: 0, result: true });

    const result9 = await validator.validate('string');

    expect(result9).toBeNull();
  });
});
