import { isSymbol } from 'lodash';

export const keys = {
  shape: Symbol('shape'),
  redundant: Symbol('redundant'),
};

const keyToMessage = {
  [keys.shape]: 'must be a plain object.',
  [keys.redundant]: 'redundant field.',
};

export default {
  shape: (args, errors) => {
    if (!errors) {
      return null;
    }

    if (isSymbol(errors)) {
      return keyToMessage[errors];
    }

    return Object.keys(errors).reduce((res, key) => {
      const error = errors[key];
      return {
        ...res,
        [key]: isSymbol(error) ? keyToMessage[error] || error : error,
      };
    }, {});
  },
};
