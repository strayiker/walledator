import Any from '../Any';
import * as Checks from './checks';

export default class String extends Any {
  constructor() {
    super({
      key: 'string',
      check: Checks.string,
    });
  }

  match(pattern) {
    return this.addCheck({
      key: 'match',
      check: Checks.match,
      args: [pattern],
    });
  }

  size(limit) {
    return this.addCheck({
      key: 'size',
      check: Checks.size,
      args: [limit],
    });
  }

  get uuid() {
    return this.addCheck({
      key: 'uuid',
      check: Checks.uuid,
    });
  }
}
