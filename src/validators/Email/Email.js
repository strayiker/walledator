import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  check: Checks.email,
  defaultMessage: defaultMessages.email,
};

export default class Email extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
  }
}
