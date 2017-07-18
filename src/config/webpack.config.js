// This config mirrors the config file used by create-react-app.
// Refer to the original source for reasnoning behind plugins used here:
// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/webpack.config.dev.js
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const map = require('../utils/mapObject');

const publicUrl = '/';

// Stringify environment variables

// TODO: test it working
const envStringified = ((env) =>
  Object.keys(env).reduce(
      (acc, key) => Object.assign(acc, { [key]: env[key] }),
      {}
  )
)(process.env)

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        `${require.resolve('webpack-dev-server/client')}?/`,
        require.resolve('webpack/hot/only-dev-server'),
        require.resolve('../client/polyfills'),
        require.resolve('react-hot-loader/patch'),
        paths.appIndexJs,
    ],
    output: {
        path: paths.appBuild,
        pathinfo: true,
        filename: 'static/js/bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: publicUrl,
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath),
    },
    resolve: {
        modules: ['node_modules', paths.appNodeModules].concat(
            (process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean)
        ),
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            'babel-runtime': path.dirname(
                require.resolve('babel-runtime/package.json')
            ),
            'react-native': 'react-native-web',
        },
        plugins: [
            new ModuleScopePlugin(paths.appSrc),
        ],
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                            baseConfig: {
                                extends: [require.resolve('eslint-config-react-app')],
                            },
                            ignore: false,
                            useEslintrc: false,
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: paths.appSrc,
            },
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                ],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: false,
                    presets: [require.resolve('babel-preset-react-app')],
                    plugins: [require.resolve('react-hot-loader/babel')],
                    cacheDirectory: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9',
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new InterpolateHtmlPlugin({ PUBLIC_URL: publicUrl }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        new webpack.DefinePlugin(envStringified),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};
