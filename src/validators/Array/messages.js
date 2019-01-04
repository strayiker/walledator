import isNumber from '../../utils/isNumber';

export default {
  array: 'must be an array.',
  size: limit => {
    if (isNumber(limit)) {
      return `must contain ${limit} items.`;
    }

    const { min = 0, max = Infinity } = limit;
    const chunks = [];

    if (min > 0) {
      chunks.push(`at least ${min}`);
    }

    if (max < Infinity) {
      chunks.push(`no more than ${max}`);
    }

    return `must contain ${chunks.join(' and ')} items.`;
  },
};
