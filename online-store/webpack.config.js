import path from 'path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import EslintPlugin from 'eslint-webpack-plugin';
import dev from './webpack.dev.config.js';
import prod from './webpack.prod.config.js';
import CopyPlugin from 'copy-webpack-plugin';

const baseConfig = {
    entry: path.resolve(path.resolve(), './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(path.resolve(), './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(path.resolve(), './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
                {
                    from: './src/assets',
                    to: './assets',
                },
                {
                    from: './src/data',
                    to: './data',
                },
            ],
        }),
    ],
};

const api = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? prod : dev;

    return merge(baseConfig, envConfig);
};

export default api;
