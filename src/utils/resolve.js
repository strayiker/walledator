import isPromise from './isPromise';

export default (value, cb) => {
  if (Array.isArray(value) && value.some(isPromise)) {
    return Promise.all(value).then(cb);
  }

  if (isPromise(value)) {
    return value.then(cb);
  }

  return cb(value);
};
