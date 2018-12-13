import {
  last,
  merge,
  isArray,
  isFinite,
  isPlainObject,
  isString,
  isUndefined,
  isFunction,
  isBoolean,
  isEmpty,
} from 'lodash';
import invariant from 'invariant';

function Callable(f) {
  return Object.setPrototypeOf(f, new.target.prototype);
}

Callable.prototype = Function.prototype;

export default class Base extends Callable {
  constructor(checkOptions) {
    super((...args) => this.tuneCurrent(args));

    this.checks = new Map();
    this.current = null;
    this.cascades = [[]];
    this.negateNext = false;
    this.options = {};

    if (checkOptions) {
      this.addCheck(checkOptions);
      this.cascades.push([]);
    }
  }

  getCheck(key) {
    return this.checks.get(key);
  }

  setOptions(options) {
    invariant(
      isPlainObject(options),
      'QQ: The "options" must be a plain object.'
    );

    this.options = merge({}, this.options, options);

    return this;
  }

  tuneCurrent(props) {
    invariant(this.current, 'QQ: Choose a check before configure it.');

    const { argsCount = 0 } = this.current;
    const args = props.slice(0, argsCount + 1);
    const message = props.length > argsCount ? props[argsCount] : undefined;

    if (message) {
      this.current.message = message;
    }

    if (args) {
      this.current.args = args;
    }

    this.current = null;

    return this;
  }

  createCheck(checkOptions) {
    invariant(
      isPlainObject(checkOptions) || isFunction(checkOptions),
      'QQ: Check options must be a plain object or a function.'
    );

    let obj = checkOptions;

    if (isFunction(obj)) {
      obj = { check: obj };
    }

    const {
      key,
      check,
      args = [],
      message,
      defaultMessage,
      allowUndefined = true,
      negate = this.negateNext,
    } = obj;

    let { argsCount } = obj;

    invariant(
      isFinite(argsCount) || isUndefined(argsCount),
      'QQ: The "argsCount" must be a number or undefined.'
    );

    if (isUndefined(argsCount)) {
      argsCount = args.length;
    }

    invariant(isArray(args), 'QQ: The "args" must be an array.');
    invariant(
      isString(key) || isUndefined(key),
      'QQ: The "key" must be a string or undefined.'
    );
    invariant(isFunction(check), 'QQ: The "check" function is required.');
    invariant(
      isUndefined(message) || isString(message) || isFunction(message),
      'QQ: The "message" must be one of next types: string, function, undefined.'
    );
    invariant(
      isBoolean(allowUndefined),
      'QQ: The "allowUndefined" must be a boolean.'
    );
    invariant(isBoolean(negate), 'QQ: The "negate" must be a boolean.');

    return {
      key,
      check,
      args,
      argsCount,
      message,
      defaultMessage,
      allowUndefined,
      negate,
    };
  }

  addCheck(checkOptions) {
    const check = this.createCheck(checkOptions);

    last(this.cascades).push(check);

    if (check.key) {
      this.checks.set(check.key, check);
    }

    this.current = check;
    this.negateNext = false;

    return this;
  }

  custom = this.addCheck;

  async check(value, definition) {
    const { check, negate, allowUndefined } = definition;

    const skip = allowUndefined && isUndefined(value);

    if (skip) {
      return null;
    }

    const args = isEmpty(definition.args) ? [undefined] : definition.args;
    const result = await check(value, ...args, this.options);
    const valid = !(!!result ^ negate);

    if (valid) {
      return null;
    }

    let message = definition.message || definition.defaultMessage;

    if (isFunction(message)) {
      message = message(...args, result);
    }

    return message || 'invalid.';
  }

  async validate(value) {
    const check = definition => this.check(value, definition);

    let errors = [];
    for (let i = 0; i < this.cascades.length; i += 1) {
      const cascade = this.cascades[i];
      const promises = cascade.map(check);
      // eslint-disable-next-line no-await-in-loop
      let cascadeErrors = await Promise.all(promises);

      cascadeErrors = cascadeErrors.filter(Boolean);

      errors = errors.concat(cascadeErrors);

      if (!isEmpty(cascadeErrors)) {
        break;
      }
    }

    if (errors.length === 0) {
      return null;
    }

    if (errors.length === 1) {
      return errors[0];
    }

    return errors;
  }

  get not() {
    this.negateNext = true;
    this.current = null;

    return this;
  }

  get then() {
    if (!isEmpty(last(this.cascades))) {
      this.cascades.push([]);
    }

    this.current = null;

    return this;
  }
}
