import { isEmpty, isPlainObject, set } from 'lodash';
import resolve from '../../../utils/resolve';

const handleShapeResults = results => {
  const errors = results.filter(({ res }) => !!res);

  if (isEmpty(errors)) {
    return null;
  }

  return errors.reduce((err, { key, res }) => set(err, key, res), {});
};

export default (obj, shape = {}, options = {}, ctx = {}) => {
  const { exact = false, awaitDeep = true } = options;
  const { path = [] } = ctx;

  if (!isPlainObject(obj)) {
    return { key: 'object' };
  }

  if (isEmpty(shape) && !exact) {
    return null;
  }

  const base = exact ? obj : shape;
  const shapeResults = Object.keys(base).map(key => {
    const value = obj[key];
    const validator = shape && shape[key];

    if (!validator) {
      return { key, res: { key: 'redundant' } };
    }

    const handleResults = res => ({ key, res });
    const results = validator.validate(value, options, {
      ...ctx,
      path: [...path, key],
    });

    if (awaitDeep) {
      return resolve(results, handleResults);
    }

    return handleResults(results);
  });

  return resolve(shapeResults, handleShapeResults);
};
