import Base from '../Base';
import * as Checks from './checks';
import defaultMessages from './messages';

export default class Any extends Base {
  constructor(checkOptions) {
    super(checkOptions);
    this.extendDefaultMessages(defaultMessages);
  }

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
