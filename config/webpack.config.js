/**
 * Webpack config generator for dev server with support for react-hot-loade
 */
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// We will be basing our webpack configuration off react-scripts to mirror its experience as closely as possible
const paths = require('react-scripts/config/paths');
const config = require('react-scripts/config/webpack.config.dev');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

/**
 * Configure webpack according to command line options
 *
 * @param {object} options Command line options
 * @returns {object} Webpack configuration object
 */
module.exports = function createWebpackConfig(options) {
    let devClient = [];

    // Inject devServer client modules in the bundle
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

    // Collect all bundle entries
    const entry = [require.resolve('react-hot-loader/patch')]
        .concat(devClient)
        .concat([
            require.resolve('react-scripts/config/polyfills'),
            require.resolve('react-error-overlay'),
            paths.appIndexJs,
        ]);

    console.log(entry);

    // Enhance module defintions by adding react-hot-loader plugin to babel loader.
    // This is copy paste from react-scripts present configuration. Not interested in supporting nesting shortcuts that
    // react-scripts may be taking advantage of in the future.
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

    // Base the resulting configuration off react-scripts config, simply override the parts we're interested in
    return Object.assign({}, config, { entry, module, plugins });
};
