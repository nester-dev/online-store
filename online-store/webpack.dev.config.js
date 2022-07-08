import path from 'path';

export default {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(path.resolve(), '../dist'),
    },
};
