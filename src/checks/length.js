import { get, isString, isFinite, isPlainObject } from 'lodash';
import invariant from 'invariant';

export default (value, limit) => {
  invariant(
    isFinite(limit) || isPlainObject(limit),
    'QQ: The argument "limit" should be a number or a plain object.'
  );
  let length = get(value, 'length');

  if (!length) {
    return true;
  }

  if (isString(value)) {
    const surrogatePairs = value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
    length -= surrogatePairs.length;
  }

  if (isFinite(limit) && length !== limit) {
    return limit;
  }

  const { min = 0, max = Infinity } = limit;

  invariant(
    min <= max,
    'QQ: Maximum length of the value can not be less then minimum.'
  );

  if (length < min || length > max) {
    return { min, max };
  }

  return false;
};
