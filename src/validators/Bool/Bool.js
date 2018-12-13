import Any from '../Any';
import * as Checks from './checks';
import defaultMessages from './messages';

const defaultOptions = {
  check: Checks.bool,
  defaultMessage: defaultMessages.bool,
};

export default class Bool extends Any {
  constructor(checkOptions = defaultOptions) {
    super(checkOptions);
  }
}
