import Base from '..';

describe('Base', () => {
  it('can be initialized without arguments', () => {
    const validator = new Base();

    expect(validator).toBeInstanceOf(Base);
    expect(validator).toHaveProperty('current');
    expect(validator).toHaveProperty('cascades');
    expect(validator).toHaveProperty('negateNext');
  });

  it('should call the "addCheck" method when initialized with arguments', () => {
    const check = jest.fn();
    const addCheck = jest
      .spyOn(Base.prototype, 'addCheck')
      .mockImplementation(() => {});
    const validator = new Base(check);

    expect(addCheck).toBeCalledWith(check);

    expect(validator).toBeInstanceOf(Base);
    expect(validator).toHaveProperty('current');
    expect(validator).toHaveProperty('cascades');
    expect(validator).toHaveProperty('negateNext');

    addCheck.mockRestore();
  });

  it('validator should be callable', () => {
    const tuneCurrent = jest
      .spyOn(Base.prototype, 'tuneCurrent')
      .mockReturnThis();
    const validator = new Base();

    expect(validator).toBeInstanceOf(Function);
    expect(() => validator()).not.toThrowError();

    tuneCurrent.mockRestore();
  });

  it('calling the validator as function should be applied to the "tuneCurrent" method and return this', () => {
    const tuneCurrent = jest
      .spyOn(Base.prototype, 'tuneCurrent')
      .mockReturnThis();
    const validator = new Base();

    const result = validator(1);

    expect(tuneCurrent).toHaveBeenCalledWith([1]);
    expect(tuneCurrent).toHaveBeenCalledTimes(1);
    expect(result).toBe(validator);

    tuneCurrent.mockRestore();
  });
});
