import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  key: 'string',
  check: Checks.string,
};

export default class String extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
    this.extendDefaultMessages(defaultMessages);
  }

  match(pattern, message) {
    return this.addCheck({
      key: 'match',
      check: Checks.match,
      args: [pattern],
      message,
    });
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
