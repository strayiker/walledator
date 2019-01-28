import isEmpty from '../../../utils/isEmpty';
import isPlainObject from '../../../utils/isPlainObject';
import resolve from '../../../utils/resolve';

const handleShapeResults = results => {
  const errors = results.filter(({ res }) => !!res);

  if (isEmpty(errors)) {
    return null;
  }

  return errors.reduce((err, { key, res }) => {
    // eslint-disable-next-line no-param-reassign
    err[key] = res;
    return err;
  }, {});
};

export default (obj, args = [], options = {}, ctx = {}) => {
  const [shape = {}] = args;
  const { exact = false, async = false } = options;
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

    return async ? handleResults(results) : resolve(results, handleResults);
  });

  return resolve(shapeResults, handleShapeResults);
};
