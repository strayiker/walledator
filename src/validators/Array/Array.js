import Any from '../Any';
import * as Checks from './checks';

export default class Array extends Any {
  constructor() {
    super({
      key: 'array',
      check: Checks.array,
    });
  }

  size(limit) {
    return this.addCheck({
      key: 'size',
      check: Checks.size,
      args: [limit],
    });
  }
}
