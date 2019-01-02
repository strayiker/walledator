import Base from '..';

describe('Base.addCheck', () => {
  beforeAll(() => {
    jest
      .spyOn(Base.prototype, 'createDefinition')
      .mockImplementation(({ key }) => ({ key }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should add a new check to the last cascade', () => {
    const validator = new Base();

    validator.addCheck({ key: 'key' });

    const cascade = validator.cascades[validator.cascades.length - 1];
    const definition = cascade[cascade.length - 1];

    expect(definition).toEqual({ id: 0, groupId: 0, key: 'key' });
  });

  it('should add a new cascade to the beginning', () => {
    const validator = new Base();

    validator.addCheck({ key: 'key' }, { prepend: true });

    const cascade = validator.cascades[0];
    const definition = cascade[0];

    expect(definition).toEqual({ id: 0, groupId: 0, key: 'key' });
  });

  it('should set "current" definition', () => {
    const validator = new Base();

    validator.addCheck({ key: 'key' });

    expect(validator.current).toEqual({ id: 0, groupId: 0, key: 'key' });
  });

  it('should return "this"', () => {
    const validator = new Base();
    const result = validator.addCheck({ key: 'key' });

    expect(result).toBe(validator);
  });
});
