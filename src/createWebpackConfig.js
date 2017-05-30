/**
 * This script enables seamless hot relaoding by injecting scripts from react-hot-loader into the client bundle and
 * augmenting babel plugin configuration with react-hot-loader's babel plugin.
 *
 * Function being exported expects original config to be conformant with webpack configuration found in react-scripts
 * repo at the time of writing.
 */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// Load the necessary internal modules to make create-react-app's webpack configuration work.
const paths = require('react-scripts/config/paths');
const config = require('react-scripts/config/webpack.config.dev');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

/**
 * Create webpack config based on react-scripts
 */
module.exports = function createWebpackConfig(options) {
    let devClient = [];

    // Configure dev server client to be included into the bundle
    if (options.client === 'webpack' || options.hotOnly) {
        devClient.push(`${require.resolve('webpack-dev-server/client')}?/`);
        if (options.hotOnly) {
            devClient.push(require.resolve('webpack/hot/only-dev-server'))
        } else {
            devClient.push(require.resolve('webpack/hot/dev-server'))
        }
    } else {
        devClient.push(require.resolve('react-dev-utils/webpackHotDevClient'));
    }

    // Pass dev server client and application files to webpack entry configuration
    const entry = [require.resolve('react-hot-loader/patch')]
        .concat(devClient)
        .concat([
            require.resolve('react-scripts/config/polyfills'),
            require.resolve('react-error-overlay'),
            paths.appIndexJs,
        ]);

    // Just copy-pasting module configuration from react-scripts. At the end it is probably the safer option to
    // replicate the whole thing rather than trying to target individual places in an independently evolving file.
    const module = Object.assign({}, config.module, {
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
                            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
        ]
    });

    const plugins = [].concat(config.plugins);

    // NamedModulePlugin can be helpful for debugging hot reloading when using webpack's own dev server
    if (options.client === 'webpack' || options.hotOnly) {
        plugins.push(new webpack.NamedModulesPlugin());
    }

    // Apply the config modifications on top of react-scripts webpack configuration
    return Object.assign({}, config, { entry, module, plugins });
};
