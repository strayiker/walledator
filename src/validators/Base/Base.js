import invariant from '../../utils/invariant';
import resolve from '../../utils/resolve';
import singlify from '../../utils/singlify';
import last from '../../utils/last';
import isArray from '../../utils/isArray';
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

  setOptions(options = {}) {
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

  defineMessages(messages = {}) {
    invariant(
      isPlainObject(messages),
      process.env.NODE_ENV !== 'production'
        ? 'The "messages" must be a plain object.'
        : ''
    );

    this.messages = messages;
  }

  tuneCurrent(args) {
    invariant(
      this.current,
      process.env.NODE_ENV !== 'production'
        ? 'Define a check before configure it.'
        : ''
    );

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
      humanize,
      skipUndefined = true,
      negate = this.negateNext,
    } = obj;

    invariant(isArray(args), 'The "args" must be an array.');
    invariant(
      isString(key) || isUndefined(key),
      process.env.NODE_ENV !== 'production'
        ? 'The "key" must be a string or undefined.'
        : ''
    );
    invariant(isFunction(check), 'The "check" function is required.');
    invariant(
      isUndefined(humanize) || isFunction(humanize),
      process.env.NODE_ENV !== 'production'
        ? 'The "humanize" must be a function or undefined.'
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
      humanize,
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

  humanizeError(error, ctx = {}) {
    if (!error || (isUndefined(error.id) && isUndefined(error.key))) {
      return error;
    }

    const { id, result } = error;
    const { messages = {}, path = [] } = ctx;
    const definition = error.key ? { key: error.key } : this.definitions[id];

    if (!definition) {
      return DEFAULT_MESSAGE;
    }

    if (isFunction(definition.humanize)) {
      return definition.humanize(error, {
        ...ctx,
        path: [...path, definition.key],
      });
    }

    const keys = makeKeys(definition, path);
    const key = keys.find(k => !!messages[k]);
    const message = key && messages[key];

    if (isFunction(message)) {
      return message(...definition.args, result) || DEFAULT_MESSAGE;
    }

    return message || DEFAULT_MESSAGE;
  }

  humanizeErrors(e, ctx = {}) {
    const errorCtx = {
      ...ctx,
      messages: { ...ctx.messages, ...this.messages },
    };
    const errors = isArray(e) ? e : [e];
    const messages = errors.map(error => this.humanizeError(error, errorCtx));

    return singlify(messages);
  }

  // eslint-disable-next-line
  check(value, definition, options = {}, ctx = {}) {
    const { id, key, check, args, negate, skipUndefined } = definition;
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

      return error;
    };

    const result = check(value, args, options, {
      ...ctx,
      path: key ? [...path, key] : path,
    });

    return resolve(result, handleResult);
  }

  validate(value, options = {}, ctx = {}) {
    const { humanize = false, ...opts } = options;
    const checkOptions = {
      ...opts,
      ...this.options,
    };

    const check = definition =>
      this.check(value, definition, checkOptions, ctx);

    const chainCascade = (i = 0) => {
      const handleResults = results => {
        const errors = results.filter(Boolean);
        return isEmpty(errors) && i < this.cascades.length - 1
          ? chainCascade(i + 1)
          : singlify(errors);
      };
      const cascade = this.cascades[i];
      const results = cascade.map(check);

      return resolve(results, handleResults);
    };

    const errors = chainCascade();

    return humanize ? this.humanizeErrors(errors) : errors;
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
