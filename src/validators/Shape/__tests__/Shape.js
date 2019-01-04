import Shape from '..';
import String from '../../String';

describe('Shape', () => {
  it('should check that value is a plain object', async () => {
    const invalid = [1, 'string', true, false, null, NaN, [], () => {}];

    const promises = invalid.map(async value => {
      const validator = new Shape();
      const res = await validator.validate(value);
      expect(res).toBe('must be a plain object.');
    });

    return Promise.all(promises);
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
      prop2: new String().size(5),
      prop3: new String().required,
      prop4: new String(),
      prop5: new Shape()({
        nested: new String().size(5).custom(() => Promise.resolve(5)),
      }),
    });

    const res1 = await validator.validate({
      prop1: 1,
      prop2: 'test',
      prop4: '',
      prop5: {
        nested: '',
      },
    });

    expect(res1).toEqual({
      prop1: 'must be a string.',
      prop2: 'must be 5 characters long.',
      prop3: 'required.',
      prop5: {
        nested: ['must be 5 characters long.', 'invalid.'],
      },
    });

    const res2 = await validator.validate(
      {
        prop1: 1,
        prop2: 'test',
        prop4: '',
        prop5: {
          nested: '',
        },
      },
      { transformErrors: false }
    );

    expect(res2).toEqual({
      id: 0,
      result: {
        prop1: { id: 0, result: true },
        prop2: { id: 1, result: 5 },
        prop3: { id: 1, result: true },
        prop5: {
          id: 0,
          result: {
            nested: [{ id: 1, result: 5 }, { id: 2, result: 5 }],
          },
        },
      },
    });
  });

  it('should use defined messages', async () => {
    const validator = new Shape()({
      prop: new String().size(5).required,
    });

    validator.extendMessages({
      'shape.prop.string': 'string',
      'shape.prop.size': 'size',
      'shape.prop.required': 'required',
    });

    const res1 = await validator.validate({ prop: 1 });
    const res2 = await validator.validate({ prop: 'test' });
    const res3 = await validator.validate({});

    expect(res1).toEqual({ prop: 'string' });
    expect(res2).toEqual({ prop: 'size' });
    expect(res3).toEqual({ prop: 'required' });
  });

  it('should match the shape exact if the "exact" is true', async () => {
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
      prop2: new String().size(5),
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

  it('should\'t wait for nested promises if "awaitDeep" is false', () => {
    const validator = new Shape()({
      prop1: new String(),
      prop2: new String().custom(() => Promise.resolve(true)),
    });

    const res = validator.validate(
      {
        prop1: 1,
        prop2: 'string',
      },
      { awaitDeep: false }
    );

    expect(res).toEqual({
      prop1: 'must be a string.',
      prop2: Promise.resolve(true),
    });
  });
});
