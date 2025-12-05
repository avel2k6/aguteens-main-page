const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devServer: {
        compress: true,
        port: 9000,
        static: {
            directory: path.resolve(__dirname, '..', 'assets'),
            watch: true,
        },
    },
    target: ['web', 'es5'],
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: false,
                            compilerOptions: {
                                noEmit: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                plugins: [
                                    require('../src/common/less-plugins'),
                                ]
                            }
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ESLintPlugin({
            failOnError: false,
            extensions: ['js', 'ts'],
        }),
        new StylelintPlugin({
            extensions: ['.less'],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'assets/main.html',
        }),
    ],
};
