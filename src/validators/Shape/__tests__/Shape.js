import Shape from '..';
import String from '../../String';

describe('Shape', () => {
  it('should check that the value is a plain object', async () => {
    const invalid = [1, 'string', true, false, null, NaN, [], () => {}];

    invalid.map(async value => {
      const validator = new Shape();
      const res = await validator.validate(value);
      expect(res).toBe('must be a plain object.');
    });
  });

  it('should return null if is no shape was provided', async () => {
    const validator = new Shape();

    const res = await validator.validate({
      prop1: 1,
    });

    expect(res).toBe(null);
  });

  it('should check all keys of the shape', async () => {
    const validator = new Shape()({
      prop1: new String(),
      prop2: new String().len(5),
      prop3: new String().required,
      prop4: new String(),
      prop5: new Shape()({
        nested: new String(),
      }),
    });

    const res = await validator.validate({
      prop1: 1,
      prop2: 'test',
      prop4: '',
      prop5: {
        nested: 1,
      },
    });

    expect(res).toEqual({
      prop1: 'must be a string.',
      prop2: 'must be 5 characters long.',
      prop3: 'required.',
      prop5: {
        nested: 'must be a string.',
      },
    });
  });

  it('should match the shape exact if the "exact" option is set', async () => {
    const validator1 = new Shape()({
      prop1: new String(),
    });
    const validator2 = new Shape();

    // eslint-disable-next-line no-unused-expressions
    validator1.exact;
    // eslint-disable-next-line no-unused-expressions
    validator2.exact;

    const value = {
      prop1: 'string',
      prop2: 'redundant',
    };

    const res1 = await validator1.validate(value);
    const res2 = await validator2.validate(value);

    expect(res1).toEqual({
      prop2: 'redundant field.',
    });
    expect(res2).toEqual({
      prop1: 'redundant field.',
      prop2: 'redundant field.',
    });
  });

  it('should return null if all keys are valid', async () => {
    const validator = new Shape()({
      prop1: new String(),
      prop2: new String().len(5),
      prop3: new String().required,
      prop4: new String(),
      prop5: new Shape()({
        nested: new String(),
      }),
    });

    const res = await validator.validate({
      prop1: '1',
      prop2: '12345',
      prop3: '',
      prop4: '',
      prop5: {
        nested: '1',
      },
    });

    expect(res).toBe(null);
  });
});
