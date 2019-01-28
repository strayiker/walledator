import invariant from '../utils/invariant';
import isString from '../utils/isString';
import isNumber from '../utils/isNumber';
import isPlainObject from '../utils/isPlainObject';
import isUndefined from '../utils/isUndefined';

export default (value, [limit]) => {
  invariant(
    isNumber(limit) || isPlainObject(limit),
    process.env.NODE_ENV !== 'production'
      ? 'The "limit" should be a number or a plain object.'
      : ''
  );

  let size;

  if (value) {
    size = value.length;
  }

  if (isUndefined(size)) {
    return limit;
  }

  if (isString(value)) {
    const surrogatePairs = value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
    size -= surrogatePairs.length;
  }

  if (isNumber(limit) && size !== limit) {
    return limit;
  }

  const { min = 0, max = Infinity } = limit;

  invariant(
    min <= max,
    process.env.NODE_ENV !== 'production'
      ? 'The "max" size should be less or equal "min" size.'
      : ''
  );

  if (size < min || size > max) {
    return { min, max };
  }

  return false;
};
