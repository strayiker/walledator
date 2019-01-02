import { get, isString, isFinite, isPlainObject } from 'lodash';
import invariant from 'invariant';

export default (value, limit) => {
  invariant(
    isFinite(limit) || isPlainObject(limit),
    'The "limit" should be a number or a plain object.'
  );
  let size = get(value, 'length');

  if (!size) {
    return true;
  }

  if (isString(value)) {
    const surrogatePairs = value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
    size -= surrogatePairs.length;
  }

  if (isFinite(limit) && size !== limit) {
    return limit;
  }

  const { min = 0, max = Infinity } = limit;

  invariant(min <= max, 'The "max" should be less or equal "min".');

  if (size < min || size > max) {
    return { min, max };
  }

  return false;
};
