const { prepareProxy } = require('react-dev-utils/WebpackDevServerUtils')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const paths = require('./paths');
const config = require('./webpack.config');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
const proxy = require(paths.appPackageJson).proxy;
const proxyConfig = prepareProxy(proxy, paths.appPublic);

module.exports = {
  compress: true,
  contentBase: paths.appPublic,
  watchContentBase: true,
  hot: true,
  publicPath: config.output.publicPath,
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebookincubator/create-react-app/issues/293
  watchOptions: {
    ignored: /node_modules/,
  },
  https: process.env.HTTPS === 'true',
  host,
  proxy,
}
