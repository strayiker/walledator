import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  check: Checks.number,
  defaultMessage: defaultMessages.number,
};

export default class Number extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
  }

  min(min, message) {
    return this.addCheck({
      check: Checks.min,
      args: [min],
      defaultMessage: defaultMessages.min,
      message,
    });
  }

  max(max, message) {
    return this.addCheck({
      check: Checks.max,
      args: [max],
      defaultMessage: defaultMessages.max,
      message,
    });
  }
}
