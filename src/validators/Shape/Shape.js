import Any from '../Any';
import isPlainObject from '../../utils/isPlainObject';
import * as Checks from './checks';

export default class Shape extends Any {
  constructor() {
    super();

    // Call addCheck after super() to be able to bind this.humanize
    this.addCheck({
      key: 'shape',
      check: Checks.shape,
      argsCount: 1,
      humanize: this.humanize.bind(this),
    });
  }

  humanizeProp(errors, validator, ctx) {
    return validator
      ? validator.humanizeErrors(errors, ctx)
      : this.humanizeErrors(errors, ctx);
  }

  humanize(error, ctx) {
    const { id, result } = error;

    if (result && result.key) {
      return this.humanizeError({ key: result.key }, ctx);
    }

    const definition = this.definitions[id];
    const [shape = {}] = definition.args;

    if (isPlainObject(result)) {
      return Object.keys(result).reduce(
        (res, key) => ({
          ...res,
          [key]: this.humanizeProp(result[key], shape[key], {
            ...ctx,
            path: [...(ctx.path || []), key],
          }),
        }),
        {}
      );
    }

    return result;
  }

  get exact() {
    return this.setOptions({ exact: true });
  }
}
