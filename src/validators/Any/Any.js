import Base from '../Base';
import * as Checks from './checks';

export default class Any extends Base {
  get required() {
    return this.addCheck(
      {
        key: 'required',
        check: Checks.required,
        skipUndefined: false,
      },
      {
        prepend: true,
      }
    );
  }
}
