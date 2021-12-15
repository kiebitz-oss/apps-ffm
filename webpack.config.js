/* eslint-env node */
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreactRefreshPlugin = require('@prefresh/webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    return {
        target: 'web',
        entry: './apps/index.jsx',
        context: path.resolve(__dirname, 'src'),
        devtool:
            argv.mode === 'production'
                ? 'hidden-source-map'
                : 'cheap-source-map',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash:12].js',
            chunkFilename: 'assets/[name].chunk.[contenthash:12].js',
            assetModuleFilename: 'assets/[name][ext]',
            publicPath: '/',
            clean: true,
            // the following setting is required for SRI to work:
            crossOriginLoading: 'anonymous',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            modules: ['src', 'node_modules'],
            alias: {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat', // Must be below test-utils
                'react/jsx-runtime': 'preact/jsx-runtime',
            },
            fallback: {
                buffer: require.resolve('buffer'),
                process: 'process/browser',
            },
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        argv.mode === 'production'
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',

                        'css-loader',
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.[tj]sx?$/i,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'assets/[name].[contenthash:12].css',
                chunkFilename: 'assets/[id].[contenthash:12].css',
            }),
            argv.mode === 'production'
                ? new CspHtmlWebpackPlugin(
                      {
                          'base-uri': "'self'",
                          'object-src': "'none'",
                          'script-src': ["'self'"],
                          'style-src': ["'self'"],
                      },
                      {
                          enabled: true,
                          hashingMethod: 'sha256',
                          hashEnabled: {
                              'script-src': true,
                              'style-src': true,
                          },
                          nonceEnabled: {
                              'script-src': true,
                              'style-src': true,
                          },
                      }
                  )
                : new PreactRefreshPlugin(),
            new HtmlWebpackPlugin({
                title: 'Impfportal Frankfurt',
                templateContent: `
                    <html>
                      <body>
                        <div id="app"></div>
                      </body>
                    </html>
                  `,
                meta: {
                    viewport: 'width=device-width, initial-scale=1',
                    // 'theme-color': '#4285f4'
                },
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
            }),
        ],
        optimization: {
            minimize: argv.mode === 'production',
            minimizer: ['...', new TerserPlugin(), new CssMinimizerPlugin()],
        },
        devServer:
            argv.mode === 'production'
                ? undefined
                : {
                      static: {
                          directory: path.join(__dirname, 'build'),
                      },

                      compress: true,
                      historyApiFallback: true,
                      hot: true,
                      port: 3000,
                  },
    };
};
