const Base = require('../../Base');
const Any = require('..');

describe('Any.required', () => {
  it('should add a new cascade with the "required" check into beginning', () => {
    const createCheck = jest
      .spyOn(Base.prototype, 'createCheck')
      .mockReturnValue(1);
    const validator = new Any();

    // eslint-disable-next-line no-unused-expressions
    validator.required;

    expect(createCheck).toHaveBeenCalledTimes(1);
    expect(validator.cascades[0][0]).toBe(1);

    createCheck.mockRestore();
  });

  it('should check that the value is not "undefined"', async () => {
    const validator = new Any();

    // eslint-disable-next-line no-unused-expressions
    validator.required;

    const res = await validator.validate(undefined);

    expect(res).toBe('required.');
  });
});
