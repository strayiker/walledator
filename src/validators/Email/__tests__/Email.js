import Email from '..';

describe('Email', () => {
  it('should check that the value is a correct email address', async () => {
    const validator = new Email();

    const result1 = await validator.validate('');
    const result2 = await validator.validate('test');
    const result3 = await validator.validate('@');
    const result4 = await validator.validate('test@');
    const result5 = await validator.validate('@test');
    const result6 = await validator.validate('test@.com');
    const result7 = await validator.validate('test@@test.com');

    expect(result1).toEqual({ id: 0, result: true });
    expect(result2).toEqual({ id: 0, result: true });
    expect(result3).toEqual({ id: 0, result: true });
    expect(result4).toEqual({ id: 0, result: true });
    expect(result5).toEqual({ id: 0, result: true });
    expect(result6).toEqual({ id: 0, result: true });
    expect(result7).toEqual({ id: 0, result: true });

    const result8 = await validator.validate('correct@email.com');

    expect(result8).toBeNull();
  });
});
