import Any from '../Any';
import * as Checks from './checks';

export default class Email extends Any {
  constructor() {
    super({
      key: 'email',
      check: Checks.email,
    });
  }
}
