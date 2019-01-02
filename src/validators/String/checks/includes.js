import { isString, isPlainObject, isFinite } from 'lodash';
import invariant from 'invariant';

export default (value, options) => {
  invariant(
    isString(options) || isPlainObject(options),
    'The "options" argument must be a string or a plain object.'
  );

  if (isString(options)) {
    return !value.includes(options);
  }

  const { substring, position = 0 } = options;

  invariant(isString(substring), 'The "substring" option must be a string.');
  invariant(isFinite(position), 'The "position" option must be a number.');

  return !value.includes(substring, position);
};
