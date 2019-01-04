const { NODE_ENV } = process.env;
const modules = NODE_ENV === 'test' ? 'cjs' : false;

module.exports = {
  presets: [['@babel/env', { modules, loose: true }]],
  plugins: ['@babel/transform-runtime', 'add-module-exports'],
};
