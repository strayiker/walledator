import Base from '..';

describe('Base.custom', () => {
  it('should call the "addCheck" method', () => {
    const addCheck = jest.spyOn(Base.prototype, 'addCheck').mockReturnThis();
    const validator = new Base();

    validator.custom(1, 2);

    expect(addCheck).toBeCalledWith(1, 2);
    expect(addCheck).toHaveBeenCalledTimes(1);

    addCheck.mockRestore();
  });

  it('should return "this"', () => {
    const addCheck = jest.spyOn(Base.prototype, 'addCheck').mockReturnThis();
    const validator = new Base();

    const result = validator.custom();

    expect(result).toBe(validator);

    addCheck.mockRestore();
  });
});
