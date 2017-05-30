#!/usr/bin/env node
const minimist = require('minimist');
const createWebpackConfig = require('../src/createWebpackConfig');
const startDevServer = require('../src/startDevServer');

const cliArgs = minimist(process.argv.slice(2), {
    string: ['client'],
    boolean: ['hot-only'],
    alias: { 'hot-only': 'hotOnly' },
});

const options = {
    hotOnly: cliArgs.hotOnly || process.env.HOT_ONLY,
    client: cliArgs.client,
};

const webpackConfig = createWebpackConfig(options);
startDevServer(webpackConfig);
