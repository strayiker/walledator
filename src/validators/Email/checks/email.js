import { isString } from 'lodash';
import { validate } from 'isemail';

export default (value, options) =>
  !isString(value) || !validate(value, options);
