export default value => {
  if (!Array.isArray(value)) {
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
