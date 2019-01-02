import { isUndefined } from 'lodash';

export default (definition, path = []) => {
  const { key, groupId } = definition;
  const keys = [];

  if (isUndefined(key)) {
    return keys;
  }

  for (let i = path.length; i >= 0; i -= 1) {
    const subPath = path.slice(0, i);

    if (!isUndefined(groupId)) {
      const keyIdPath = subPath.concat([key, groupId]);
      keys.push(keyIdPath.join('.'));
    }

    const keyPath = subPath.concat([key]);
    keys.push(keyPath.join('.'));
  }

  return keys;
};
