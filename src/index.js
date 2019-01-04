import Any from './validators/Any';
import Array from './validators/Array';
import String from './validators/String';
import Shape from './validators/Shape';
import Number from './validators/Number';
import Email from './validators/Email';

Object.defineProperties(module.exports, {
  any: {
    get() {
      return new Any();
    },
  },
  array: {
    get() {
      return new Array();
    },
  },
  string: {
    get() {
      return new String();
    },
  },
  shape: {
    get() {
      return new Shape();
    },
  },
  number: {
    get() {
      return new Number();
    },
  },
  email: {
    get() {
      return new Email();
    },
  },
});
