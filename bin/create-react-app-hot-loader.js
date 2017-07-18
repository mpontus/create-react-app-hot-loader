#!/usr/bin/env node

// babel-preset-react-app requires these variables to be set
process.env.NODE_ENV = 'development'
process.env.BABEL_ENV = 'development'

const webpack = require('webpack');
const Server = require('webpack-dev-server');
const compilerConfig = require('../src/config/webpack.config');
const serverConfig = require('../src/config/devServer.config');
const compiler = webpack(compilerConfig);
const server = new Server(compiler, serverConfig);
const port = parseInt(process.env.PORT, 10) || 3000;
const { host, https } = serverConfig;

server.listen(port, host, (err) => {
  if (err) throw err;

  const protocol = https ? 'https' : 'http';
  const url = `${protocol}://${host}:${port}/`

  console.log(`Project is running on ${url}`);
});
