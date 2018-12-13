import { isPlainObject, isUndefined, isEmpty, isNull, set } from 'lodash';
import invariant from 'invariant';
import { keys } from '../messages';

export default async (obj, shape, options = {}) => {
  const { exact = false } = options;

  invariant(
    isPlainObject(shape) || isUndefined(shape),
    'The shape must be a plain object or undefined.'
  );

  if (!isPlainObject(obj)) {
    return keys.shape;
  }

  if (!shape && !exact) {
    return null;
  }

  const base = exact ? obj : shape;
  const promises = Object.keys(base).map(async key => {
    const validator = shape && shape[key];
    const value = obj[key];

    let error;

    if (validator) {
      error = await validator.validate(value);
    } else {
      error = keys.redundant;
    }

    return { key, error };
  });

  let errors = await Promise.all(promises);

  errors = errors.filter(({ error }) => !isNull(error));

  if (isEmpty(errors)) {
    return null;
  }

  errors = errors.reduce(
    (result, { key, error }) => set(result, key, error),
    {}
  );

  return errors;
};
