/* eslint-env node */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const PreactRefreshPlugin = require('@prefresh/webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const PUBLIC_DIR = path.resolve(BUILD_DIR, 'public');
const PUBLIC_SRC_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');

//we collect static files from various places

let config = {
    target: 'web',
    context: SRC_DIR,
    resolve: {
        fallback: {
            buffer: require.resolve('buffer'),
            process: 'process/browser',
        },
        // symlinks: false,
        extensions: [
            // if an import has no file ending, they will be resolved in this order
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
        ],
        modules: [SRC_DIR, NODE_MODULES_DIR],

        alias: {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat', // Must be below test-utils
            'react/jsx-runtime': 'preact/jsx-runtime',
        },
    },
    entry: {
        [`app`]: SRC_DIR + `/apps/index.jsx`,
    },
    module: {
        rules: [
            // make sure the CSS rules are the first two rules, as we replace
            // them below for the production config
            // BEGIN(CSS) DO NOT MOVE
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            // END(CSS) DO NOT MOVE
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.[tj]sx?$/,
                include: [SRC_DIR],
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    output: {
        path: PUBLIC_DIR,
        filename: '[name].js',
        chunkFilename: '[name].[contenthash].js',
        publicPath: '/public/',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: PUBLIC_SRC_DIR,
                    to: PUBLIC_DIR,
                    toType: 'dir',
                },
            ],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    config = {
        ...config,
        mode: 'production',
        plugins: [
            ...config.plugins,
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'production',
                COMMIT_SHA:
                    process.env.CI_COMMIT_SHA ||
                    process.env.COMMIT_SHA ||
                    'unknown',
            }),
        ],
        module: {
            ...config.module,
            rules: [
                // make sure the CSS rules are the first two
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                    ],
                },
                ...config.module.rules.slice(1),
            ],
        },
        optimization: {
            minimize: true,
            minimizer: ['...', new TerserPlugin(), new CssMinimizerPlugin()],
        },
    };
} else {
    config = {
        ...config,
        mode: 'development',
        devtool: 'cheap-module-source-map',

        devServer: {
            // enable Hot Module Replacement on the server
            host: '0.0.0.0',
            port: 3000,
            hot: true,
            compress: true,

            //always render index.html if the document does not exist (we need this for correct routing)
            historyApiFallback: true,

            // match the output `publicPath`
            static: {
                publicPath: '/',
                directory: PUBLIC_SRC_DIR,
            },

            proxy: {
                '/api': {
                    target: 'http://localhost:8888/',
                    secure: false,
                },
            },

            // we enable CORS requests (useful for testing)
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers':
                    'X-Requested-With, content-type, Authorization',
            },
        },
        plugins: [
            ...config.plugins,
            new PreactRefreshPlugin(),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
                COMMIT_SHA:
                    process.env.CI_COMMIT_SHA ||
                    process.env.COMMIT_SHA ||
                    'unknown',
            }),
        ],
    };
}

module.exports = config;
