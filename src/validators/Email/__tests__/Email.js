import Email from '..';

describe('Email', () => {
  it('should check that the value is a correct email address', async () => {
    const validator = new Email();

    const invalid = [
      '',
      'test',
      '@',
      'test@',
      '@test',
      'test@.com',
      'test@@test.com',
    ];

    invalid.map(async value => {
      const res = await validator.validate(value);
      expect(res).toBe('must be a valid email address.');
    });

    const res = await validator.validate('correct@email.com');

    expect(res).toBe(null);
  });
});
