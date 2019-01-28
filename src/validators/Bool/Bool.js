import Any from '../Any';
import * as Checks from './checks';

export default class Bool extends Any {
  constructor() {
    super({
      key: 'bool',
      check: Checks.bool,
    });
  }
}
