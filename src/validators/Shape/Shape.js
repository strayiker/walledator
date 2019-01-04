import Any from '../Any';
import isPlainObject from '../../utils/isPlainObject';
import * as Checks from './checks';
import defaultMessages from './messages';

export default class Shape extends Any {
  constructor() {
    super();
    this.extendDefaultMessages(defaultMessages);
    this.addCheck({
      key: 'shape',
      check: Checks.shape,
      argsCount: 1,
      toMessage: this.toMessage.bind(this),
    });
  }

  transformPropErrors(errors, validator, ctx) {
    return validator
      ? validator.transformErrors(errors, ctx)
      : this.transformErrors(errors, ctx);
  }

  toMessage(error, ctx) {
    const { id, result } = error;

    if (result && result.key) {
      return this.transformError({ key: result.key }, ctx);
    }

    const definition = this.definitions[id];
    const [shape = {}] = definition.args;

    if (isPlainObject(result)) {
      return Object.keys(result).reduce(
        (res, key) => ({
          ...res,
          [key]: this.transformPropErrors(result[key], shape[key], {
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
    return this.extendOptions({ exact: true });
  }
}
