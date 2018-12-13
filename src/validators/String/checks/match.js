import { isString, isRegExp } from 'lodash';
import invariant from 'invariant';

export default (value, pattern) => {
  invariant(
    isString(pattern) || isRegExp(pattern),
    'QQ: The "pattern" argument must be a string or a RegExp.'
  );

  let regex = pattern;

  if (isString(pattern)) {
    regex = new RegExp(pattern);
  }

  return !regex.test(value);
};
