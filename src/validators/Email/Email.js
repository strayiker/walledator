import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  key: 'email',
  check: Checks.email,
};

export default class Email extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
    this.extendDefaultMessages(defaultMessages);
  }
}
