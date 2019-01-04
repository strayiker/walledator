import isEmail from 'validator/lib/isEmail';
import isString from '../../../utils/isString';

export default value => !isString(value) || !isEmail(value);
