import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  key: 'number',
  check: Checks.number,
};

export default class Number extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
    this.extendDefaultMessages(defaultMessages);
  }

  min(min, message) {
    return this.addCheck({
      key: 'min',
      check: Checks.min,
      args: [min],
      message,
    });
  }

  max(max, message) {
    return this.addCheck({
      key: 'max',
      check: Checks.max,
      args: [max],
      message,
    });
  }
}
