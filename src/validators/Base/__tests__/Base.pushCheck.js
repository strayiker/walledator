import Base from '..';

describe('Base.addCheck', () => {
  const checkOptions = () => {};

  beforeAll(() => {
    jest
      .spyOn(Base.prototype, 'createCheck')
      .mockImplementation(() => ({ checkOptions }));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should add a new check to the last cascade', () => {
    const validator = new Base();

    validator.addCheck(checkOptions);

    const lastCascade = validator.cascades[validator.cascades.length - 1];
    const lastCheck = lastCascade[lastCascade.length - 1];

    expect(lastCheck).toEqual({ checkOptions });
  });

  it('should set the "current" property', () => {
    const validator = new Base();

    validator.addCheck(checkOptions);

    expect(validator.current).toEqual({ checkOptions });
  });

  it('should reset the "negateNext" property', () => {
    const validator = new Base();

    validator.negateNext = true;
    validator.addCheck(() => {});

    expect(validator.negateNext).toBe(false);
  });

  it('should return "this"', () => {
    const validator = new Base();
    const result = validator.addCheck();

    expect(result).toBe(validator);
  });
});
