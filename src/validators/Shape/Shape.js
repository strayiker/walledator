import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  check: Checks.shape,
  argsCount: 1,
  defaultMessage: defaultMessages.shape,
};

export default class Shape extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
  }

  get exact() {
    return this.setOptions({ exact: true });
  }
}
