const Base = require('../../Base');
const Any = require('..');

describe('Any.required', () => {
  it('should add a new check into beginning', () => {
    const createDefinition = jest
      .spyOn(Base.prototype, 'createDefinition')
      .mockReturnValue({});
    const validator = new Any();

    // eslint-disable-next-line no-unused-expressions
    validator.required;

    expect(validator.cascades[0][0]).toEqual({
      id: 0,
      groupId: undefined,
    });

    createDefinition.mockRestore();
  });

  it('should check that the value is not "undefined"', async () => {
    const validator = new Any();

    // eslint-disable-next-line no-unused-expressions
    validator.required;

    const res = await validator.validate(undefined);

    expect(res).toBe('required.');
  });
});
