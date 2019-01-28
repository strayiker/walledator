const Any = require('..');

describe('Any', () => {
  it('should pass any value', async () => {
    const validator = new Any();

    const result1 = await validator.validate(1);
    const result2 = await validator.validate('');
    const result3 = await validator.validate(true);
    const result4 = await validator.validate(false);
    const result5 = await validator.validate(null);
    const result6 = await validator.validate(undefined);
    const result7 = await validator.validate(NaN);
    const result8 = await validator.validate({});
    const result9 = await validator.validate([]);
    const result10 = await validator.validate(() => {});

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
    expect(result4).toBeNull();
    expect(result5).toBeNull();
    expect(result6).toBeNull();
    expect(result7).toBeNull();
    expect(result8).toBeNull();
    expect(result9).toBeNull();
    expect(result10).toBeNull();
  });
});
