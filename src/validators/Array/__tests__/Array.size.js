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

    expect(res1).toEqual({ id: 1, result: 5 });
    expect(res2).toEqual({ id: 1, result: { min: 5, max: Infinity } });
    expect(res3).toEqual({ id: 1, result: { min: 0, max: 2 } });
    expect(res4).toEqual({ id: 1, result: { min: 2, max: 3 } });

    const res5 = await validator1.validate([1, 2, 3, 4, 5]);
    const res6 = await validator2.validate([1, 2, 3, 4, 5]);
    const res7 = await validator3.validate([1]);
    const res8 = await validator4.validate([1, 2, 3]);

    expect(res5).toBeNull();
    expect(res6).toBeNull();
    expect(res7).toBeNull();
    expect(res8).toBeNull();
  });
});
