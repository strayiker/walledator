import Any from './validators/Any';
import Array from './validators/Array';
import String from './validators/String';
import Shape from './validators/Shape';
import Number from './validators/Number';
import Email from './validators/Email';

export default {
  get any() {
    return new Any();
  },
  get array() {
    return new Array();
  },
  get string() {
    return new String();
  },
  get shape() {
    return new Shape();
  },
  get number() {
    return new Number();
  },
  get email() {
    return new Email();
  },
};
