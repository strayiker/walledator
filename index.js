if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/walledator.cjs');
} else {
  module.exports = require('./dist/walledator.develop.cjs');
}
