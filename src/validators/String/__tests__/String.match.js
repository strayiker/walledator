import String from '..';

describe('String.matches', () => {
  it('should check that the value matches the pattern', async () => {
    const validator1 = new String().match(/test/i);
    const validator2 = new String().match('test');

    const res1 = await validator1.validate('test');
    const res2 = await validator1.validate('Test');
    const res3 = await validator1.validate('tes');
    const res4 = await validator2.validate('test');
    const res5 = await validator2.validate('Test');
    const res6 = await validator2.validate('tes');

    expect(res1).toBeNull();
    expect(res2).toBeNull();
    expect(res3).toEqual({ id: 1, result: true });
    expect(res4).toBeNull();
    expect(res5).toEqual({ id: 1, result: true });
    expect(res6).toEqual({ id: 1, result: true });
  });
});
