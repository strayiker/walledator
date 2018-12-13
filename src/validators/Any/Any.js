import Base from '../Base';
import * as Checks from './checks';
import defaultMessages from './messages';

export default class Any extends Base {
  get required() {
    const check = this.createCheck({
      check: Checks.required,
      defaultMessage: defaultMessages.required,
      allowUndefined: false,
    });

    this.current = check;
    this.cascades.unshift([check]);
    this.negateNext = false;

    return this;
  }
}
