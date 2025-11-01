const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '..', './docs'),
        filename: 'build.js',
        library: {
            name: 'link-input',
            type: 'umd',
        },
        clean: true,
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
                            configFile: 'tsconfig.build.json',
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|otf|ttf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'dist',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({}),
        new ESLintPlugin({
            fix: true,
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new StylelintPlugin({
            fix: true,
            extensions: ['.less'],
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, '..', 'assets','images'), to: path.resolve(__dirname, '..','docs','images')},
            ]
        }),
    ],
};
