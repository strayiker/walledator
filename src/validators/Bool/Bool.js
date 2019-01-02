import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  key: 'bool',
  check: Checks.bool,
};

export default class Bool extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
    this.extendDefaultMessages(defaultMessages);
  }
}
