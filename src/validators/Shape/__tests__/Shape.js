import Shape from '..';
import String from '../../String';

describe('Shape', () => {
  it('should check that value is a plain object', async () => {
    const validator = new Shape();

    const result1 = await validator.validate(1);
    const result2 = await validator.validate('');
    const result3 = await validator.validate(true);
    const result4 = await validator.validate(false);
    const result5 = await validator.validate(null);
    const result6 = await validator.validate(NaN);
    const result7 = await validator.validate([]);
    const result8 = await validator.validate(() => {});

    expect(result1).toEqual({ id: 0, result: { key: 'object' } });
    expect(result2).toEqual({ id: 0, result: { key: 'object' } });
    expect(result3).toEqual({ id: 0, result: { key: 'object' } });
    expect(result4).toEqual({ id: 0, result: { key: 'object' } });
    expect(result5).toEqual({ id: 0, result: { key: 'object' } });
    expect(result6).toEqual({ id: 0, result: { key: 'object' } });
    expect(result7).toEqual({ id: 0, result: { key: 'object' } });
    expect(result8).toEqual({ id: 0, result: { key: 'object' } });
  });

  it('should pass if shape was not defined', async () => {
    const validator = new Shape();

    const result = await validator.validate({});

    expect(result).toBeNull();
  });

  it('should check that object matching the shape', async () => {
    const validator = new Shape()({
      prop1: new String(),
      prop2: new Shape()({
        prop3: new String().required,
      }),
    });

    const result1 = await validator.validate({
      prop1: '',
      prop2: {
        prop3: '',
      },
    });

    expect(result1).toBeNull();

    const result2 = await validator.validate({
      prop1: 1,
      prop2: {},
    });

    expect(result2).toEqual({
      id: 0,
      result: {
        prop1: { id: 0, result: true },
        prop2: {
          id: 0,
          result: {
            prop3: { id: 1, result: true },
          },
        },
      },
    });
  });

  it('should humanize the properties', async () => {
    const validator = new Shape()({
      prop: new String().size(5).required,
    });

    validator.defineMessages({
      'shape.prop.string': 'string',
      'shape.prop.size': 'size',
      'shape.prop.required': 'required',
    });

    const res1 = await validator.validate({ prop: 1 }, { humanize: true });
    const res2 = await validator.validate({ prop: 'test' }, { humanize: true });
    const res3 = await validator.validate({}, { humanize: true });

    expect(res1).toEqual({ prop: 'string' });
    expect(res2).toEqual({ prop: 'size' });
    expect(res3).toEqual({ prop: 'required' });
  });

  it('should match the shape exact if the "exact" option is true', async () => {
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
      id: 0,
      result: {
        prop2: { key: 'redundant' },
      },
    });
    expect(res2).toEqual({
      id: 0,
      result: {
        prop1: { key: 'redundant' },
        prop2: { key: 'redundant' },
      },
    });
  });

  it('should\'t resolve the nested promises if "async" is true', async () => {
    const validator = new Shape()({
      prop1: new String(),
      prop2: new String().custom(() => Promise.resolve(true)),
    });

    const result1 = await validator.validate(
      { prop1: 1, prop2: 'string' },
      { async: true }
    );

    expect(result1).toEqual({
      id: 0,
      result: {
        prop1: { id: 0, result: true },
        prop2: Promise.resolve(),
      },
    });
    expect(await result1.result.prop2).toEqual({ id: 1, result: true });

    const result2 = await validator.validate(
      { prop1: 1, prop2: 'string' },
      { humanize: true, async: true }
    );

    expect(result2).toEqual({
      prop1: 'invalid.',
      prop2: Promise.resolve(),
    });
    expect(await result2.prop2).toBe('invalid.');
  });
});
