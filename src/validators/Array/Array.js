import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  key: 'array',
  check: Checks.array,
};

export default class Array extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
    this.extendDefaultMessages(defaultMessages);
  }

  size(limit, message) {
    return this.addCheck({
      key: 'size',
      check: Checks.size,
      args: [limit],
      message,
    });
  }
}
