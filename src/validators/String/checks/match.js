import invariant from '../../../utils/invariant';
import isString from '../../../utils/isString';
import isRegExp from '../../../utils/isRegExp';

export default (value, [pattern]) => {
  invariant(
    isString(pattern) || isRegExp(pattern),
    process.env.NODE_ENV !== 'production'
      ? 'The "pattern" argument must be a string or a RegExp.'
      : ''
  );

  let regex = pattern;

  if (isString(pattern)) {
    regex = new RegExp(pattern);
  }

  return !regex.test(value);
};
