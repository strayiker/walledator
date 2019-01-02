import Array from '..';

describe('Array.size', () => {
  it('should check size of the value', async () => {
    const validator1 = new Array().size(5);
    const validator2 = new Array().size({ min: 5 });
    const validator3 = new Array().size({ max: 2 });
    const validator4 = new Array().size({ min: 2, max: 3 });

    const res1 = await validator1.validate([1, 2, 3, 4]);
    const res2 = await validator2.validate([1, 2, 3, 4]);
    const res3 = await validator3.validate([1, 2, 3, 4]);
    const res4 = await validator4.validate([1, 2, 3, 4]);

    expect(res1).toBe('must contain 5 items.');
    expect(res2).toBe('must contain at least 5 items.');
    expect(res3).toBe('must contain no more than 2 items.');
    expect(res4).toBe('must contain at least 2 and no more than 3 items.');

    const res5 = await validator1.validate([1, 2, 3, 4, 5]);
    const res6 = await validator2.validate([1, 2, 3, 4, 5]);
    const res7 = await validator3.validate([1]);
    const res8 = await validator4.validate([1, 2, 3]);

    expect(res5).toBe(null);
    expect(res6).toBe(null);
    expect(res7).toBe(null);
    expect(res8).toBe(null);
  });
});
