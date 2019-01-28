import String from '..';

describe('String.size', () => {
  it('should check the size of the value', async () => {
    const validator1 = new String().size(5);
    const validator2 = new String().size({ min: 5 });
    const validator3 = new String().size({ max: 2 });
    const validator4 = new String().size({ min: 2, max: 3 });

    const result1 = await validator1.validate('test');
    const result2 = await validator2.validate('test');
    const result3 = await validator3.validate('test');
    const result4 = await validator4.validate('test');

    expect(result1).toEqual({ id: 1, result: 5 });
    expect(result2).toEqual({ id: 1, result: { min: 5, max: Infinity } });
    expect(result3).toEqual({ id: 1, result: { min: 0, max: 2 } });
    expect(result4).toEqual({ id: 1, result: { min: 2, max: 3 } });

    const result5 = await validator1.validate('12345');
    const result6 = await validator2.validate('12345');
    const result7 = await validator3.validate('1');
    const result8 = await validator4.validate('123');

    expect(result5).toBeNull();
    expect(result6).toBeNull();
    expect(result7).toBeNull();
    expect(result8).toBeNull();
  });
});
