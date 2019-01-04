import invariant from '../../../utils/invariant';
import isString from '../../../utils/isString';
import isPlainObject from '../../../utils/isPlainObject';
import isNumber from '../../../utils/isNumber';

export default (value, options) => {
  invariant(
    isString(options) || isPlainObject(options),
    process.env.NODE_ENV !== 'production'
      ? 'The "options" argument must be a string or a plain object.'
      : ''
  );

  if (isString(options)) {
    return !value.includes(options);
  }

  const { substring, position = 0 } = options;

  invariant(
    isString(substring),
    process.env.NODE_ENV !== 'production'
      ? 'The "substring" option must be a string.'
      : ''
  );
  invariant(
    isNumber(position),
    process.env.NODE_ENV !== 'production'
      ? 'The "position" option must be a number.'
      : ''
  );

  return !value.includes(substring, position);
};
