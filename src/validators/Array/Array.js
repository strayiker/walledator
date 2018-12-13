import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  check: Checks.array,
  defaultMessage: defaultMessages.array,
};

export default class Array extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
  }

  len(limit, message) {
    return this.addCheck({
      check: Checks.length,
      args: [limit],
      defaultMessage: defaultMessages.length,
      message,
    });
  }
}
