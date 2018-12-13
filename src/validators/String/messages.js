import { isFinite } from 'lodash';

export default {
  string: 'must be a string.',
  len: limit => {
    if (isFinite(limit)) {
      return `must be ${limit} characters long.`;
    }

    const { min = 0, max = Infinity } = limit;
    const chunks = [];

    if (min > 0) {
      chunks.push(`at least ${min}`);
    }

    if (max < Infinity) {
      chunks.push(`greater than ${max}`);
    }

    return `must be ${chunks.join(' and ')} characters long.`;
  },
  match: pattern => `must match the pattern "${pattern}".`,
};
