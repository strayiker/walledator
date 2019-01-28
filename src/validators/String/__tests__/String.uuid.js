import String from '..';

describe('String.uuid', () => {
  it('should check uuid pattern', async () => {
    const validator = new String().uuid;

    const result1 = await validator.validate(
      '00000000-0000-0000-0000-000000000000'
    );
    const result2 = await validator.validate('000000000000');

    expect(result1).toBeNull();
    expect(result2).toEqual({ id: 1, result: true });
  });
});
