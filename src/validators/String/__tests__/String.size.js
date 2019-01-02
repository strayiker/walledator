import String from '..';

describe('String.size', () => {
  it('should check the size of the value', async () => {
    const validator1 = new String().size(5);
    const validator2 = new String().size({ min: 5 });
    const validator3 = new String().size({ max: 2 });
    const validator4 = new String().size({ min: 2, max: 3 });

    const res1 = await validator1.validate('test');
    const res2 = await validator2.validate('test');
    const res3 = await validator3.validate('test');
    const res4 = await validator4.validate('test');

    expect(res1).toBe('must be 5 characters long.');
    expect(res2).toBe('must be at least 5 characters long.');
    expect(res3).toBe('must be greater than 2 characters long.');
    expect(res4).toBe('must be at least 2 and greater than 3 characters long.');

    const res5 = await validator1.validate('12345');
    const res6 = await validator2.validate('12345');
    const res7 = await validator3.validate('1');
    const res8 = await validator4.validate('123');

    expect(res5).toBe(null);
    expect(res6).toBe(null);
    expect(res7).toBe(null);
    expect(res8).toBe(null);
  });
});
