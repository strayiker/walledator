import Any from '../Any';
import * as Checks from './checks';

export default class Number extends Any {
  constructor() {
    super({
      key: 'number',
      check: Checks.number,
    });
  }

  min(min) {
    return this.addCheck({
      key: 'min',
      check: Checks.min,
      args: [min],
    });
  }

  max(max) {
    return this.addCheck({
      key: 'max',
      check: Checks.max,
      args: [max],
    });
  }
}
