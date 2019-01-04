import invariant from '../../utils/invariant';
import resolve from '../../utils/resolve';
import singlify from '../../utils/singlify';
import last from '../../utils/last';
import isArray from '../../utils/isArray';
import isNumber from '../../utils/isNumber';
import isPlainObject from '../../utils/isPlainObject';
import isString from '../../utils/isString';
import isUndefined from '../../utils/isUndefined';
import isFunction from '../../utils/isFunction';
import isBoolean from '../../utils/isBoolean';
import isEmpty from '../../utils/isEmpty';
import makeKeys from './makeKeys';

const DEFAULT_MESSAGE = 'invalid.';

function Callable(f) {
  return Object.setPrototypeOf(f, new.target.prototype);
}

Callable.prototype = Function.prototype;

export default class Base extends Callable {
  constructor(checkOptions) {
    super((...args) => this.tuneCurrent(args));

    this.definitions = [];
    this.cascades = [[]];
    this.current = null;
    this.negateNext = false;
    this.defaultMessages = {};
    this.messages = {};
    this.options = {};

    if (checkOptions) {
      this.addCheck(checkOptions);
      this.cascades.push([]);
    }
  }

  nextId() {
    return this.definitions.length;
  }

  nextGroupId(key) {
    return key && this.definitions.filter(d => d.key === key).length;
  }

  extendOptions(options = {}) {
    invariant(
      isPlainObject(options),
      process.env.NODE_ENV !== 'production'
        ? 'The "options" must be a plain object.'
        : ''
    );

    this.options = {
      ...this.options,
      ...options,
    };
  }

  extendMessages(messages = {}) {
    invariant(
      isPlainObject(messages),
      process.env.NODE_ENV !== 'production'
        ? 'The "messages" must be a plain object.'
        : ''
    );

    this.messages = {
      ...this.messages,
      ...messages,
    };
  }

  extendDefaultMessages(defaultMessages = {}) {
    invariant(
      isPlainObject(defaultMessages),
      process.env.NODE_ENV !== 'production'
        ? 'The "defaultMessages" must be a plain object.'
        : ''
    );

    this.defaultMessages = {
      ...this.defaultMessages,
      ...defaultMessages,
    };
  }

  tuneCurrent(props) {
    invariant(
      this.current,
      process.env.NODE_ENV !== 'production'
        ? 'Define a check before configure it.'
        : ''
    );

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

  createDefinition(options) {
    invariant(
      isPlainObject(options) || isFunction(options),
      process.env.NODE_ENV !== 'production'
        ? 'The "options" must be a plain object or a function.'
        : ''
    );

    let obj = options;

    if (isFunction(obj)) {
      obj = { check: obj };
    }

    const {
      key,
      check,
      args = [],
      message,
      defaultMessage,
      toMessage,
      skipUndefined = true,
      negate = this.negateNext,
    } = obj;

    let { argsCount } = obj;

    invariant(
      isNumber(argsCount) || isUndefined(argsCount),
      process.env.NODE_ENV !== 'production'
        ? 'The "argsCount" must be a number or undefined.'
        : ''
    );

    if (isUndefined(argsCount)) {
      argsCount = args.length;
    }

    invariant(isArray(args), 'The "args" must be an array.');
    invariant(
      isString(key) || isUndefined(key),
      process.env.NODE_ENV !== 'production'
        ? 'The "key" must be a string or undefined.'
        : ''
    );
    invariant(isFunction(check), 'The "check" function is required.');
    invariant(
      isUndefined(message) || isString(message) || isFunction(message),
      process.env.NODE_ENV !== 'production'
        ? 'The "message" must be one of next types: string, function, undefined.'
        : ''
    );
    invariant(
      isUndefined(defaultMessage) ||
        isString(defaultMessage) ||
        isFunction(defaultMessage),
      process.env.NODE_ENV !== 'production'
        ? 'The "defaultMessage" must be one of next types: string, function, undefined.'
        : ''
    );
    invariant(
      isUndefined(toMessage) || isFunction(toMessage),
      process.env.NODE_ENV !== 'production'
        ? 'The "toMessage" must be a function or undefined.'
        : ''
    );
    invariant(
      isBoolean(skipUndefined),
      process.env.NODE_ENV !== 'production'
        ? 'The "skipUndefined" must be a boolean.'
        : ''
    );
    invariant(
      isBoolean(negate),
      process.env.NODE_ENV !== 'production'
        ? 'The "negate" must be a boolean.'
        : ''
    );

    this.negateNext = false;

    return {
      key,
      check,
      args,
      argsCount,
      message,
      defaultMessage,
      toMessage,
      skipUndefined,
      negate,
    };
  }

  addCheck(checkOptions, { prepend = false } = {}) {
    let cascade;

    if (prepend) {
      cascade = [];
      this.cascades.unshift(cascade);
    } else {
      cascade = last(this.cascades);
    }

    const definition = this.createDefinition(checkOptions);

    definition.id = this.nextId();
    definition.groupId = this.nextGroupId(definition.key);

    cascade.push(definition);
    this.definitions[definition.id] = definition;
    this.current = definition;

    return this;
  }

  custom(checkOptions, options) {
    return this.addCheck(checkOptions, options);
  }

  transformError(error, ctx = {}) {
    if (!error || (isUndefined(error.id) && isUndefined(error.key))) {
      return error;
    }

    const { id, result } = error;
    const { messages = {}, path = [] } = ctx;
    const definition = error.key ? { key: error.key } : this.definitions[id];

    if (!definition) {
      return DEFAULT_MESSAGE;
    }

    if (isFunction(definition.toMessage)) {
      return definition.toMessage(error, {
        ...ctx,
        path: [...path, definition.key],
      });
    }

    const keys = makeKeys(definition, path);
    const key = keys.find(k => !!messages[k]);
    const dKey = keys.find(k => !!this.defaultMessages[k]);
    const message = key && messages[key];
    const defaultMessage = dKey && this.defaultMessages[dKey];
    const msg =
      definition.message ||
      message ||
      definition.defaultMessage ||
      defaultMessage ||
      DEFAULT_MESSAGE;

    if (isFunction(msg)) {
      return msg(...definition.args, result);
    }

    return msg;
  }

  transformErrors(e, ctx = {}) {
    const { messages = {} } = ctx;
    const errorCtx = {
      ...ctx,
      messages: { ...messages, ...this.messages },
    };
    const errors = isArray(e) ? e : [e];
    const msgs = errors.map(error => this.transformError(error, errorCtx));

    return singlify(msgs);
  }

  check(value, definition, options = {}, ctx = {}) {
    const { id, key, check, negate, skipUndefined } = definition;
    const { transformErrors = true } = options;
    const { path = [] } = ctx;
    const skip = skipUndefined && isUndefined(value);

    if (skip) {
      return null;
    }

    const handleResult = result => {
      const valid = !(!!result ^ negate);

      if (valid) {
        return null;
      }

      const error = { id, result };

      return transformErrors ? this.transformError(error, ctx) : error;
    };

    const checkCtx = {
      ...ctx,
      path: key ? [...path, key] : path,
    };
    const args = isEmpty(definition.args) ? [undefined] : definition.args;
    const result = check(value, ...args, options, checkCtx);

    return resolve(result, handleResult);
  }

  validate(value, options = {}, ctx = {}) {
    const { messages = {} } = ctx;
    const checkOptions = {
      ...options,
      ...this.options,
    };
    const checkCtx = {
      ...ctx,
      messages: { ...messages, ...this.messages },
    };

    const check = definition =>
      this.check(value, definition, checkOptions, checkCtx);

    const chainCascade = (i = 0) => {
      const handleResults = results => {
        const errors = results.filter(Boolean);
        return isEmpty(errors) && i < this.cascades.length - 1
          ? chainCascade(i + 1, check, options, ctx)
          : singlify(errors);
      };
      const cascade = this.cascades[i];
      const results = cascade.map(check);

      return resolve(results, handleResults);
    };

    return chainCascade();
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
