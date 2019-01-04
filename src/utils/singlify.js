import isArray from './isArray';

export default value => {
  if (!isArray(value)) {
    return value;
  }

  if (value.length === 0) {
    return null;
  }

  if (value.length === 1) {
    return value[0];
  }

  return value;
};
