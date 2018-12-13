import Any from './Any';
import Array from './Array';
import String from './String';
import Shape from './Shape';
import Number from './Number';
import Email from './Email';

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
