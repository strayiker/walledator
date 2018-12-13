import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  check: Checks.string,
  defaultMessage: defaultMessages.string,
};

export default class String extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
  }

  match(pattern, message) {
    return this.addCheck({
      check: Checks.match,
      args: [pattern],
      defaultMessage: defaultMessages.match,
      message,
    });
  }

  len(limit, message) {
    return this.addCheck({
      check: Checks.length,
      args: [limit],
      defaultMessage: defaultMessages.len,
      message,
    });
  }
}
