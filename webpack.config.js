const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const { presets } = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
    // Add every react-native package that needs compiling
    // 'react-native-gesture-handler',
    '@brightlayer-ui/colors',
    '@brightlayer-ui/icons-svg',
    '@brightlayer-ui/react-native-components',
    '@brightlayer-ui/react-native-themes',
    '@brightlayer-ui/react-native-vector-icons',
    '@react-native-community/masked-view"',
    '@react-navigation/drawer',
    '@react-navigation/native',
    '@react-navigation/stack',
    'react',
    'react-native',
    'react-native-draggable-flatlist',
    'react-native-gesture-handler',
    'react-native-keyboard-aware-scroll-view',
    'react-native-modal',
    'react-native-paper',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-screens',
    'react-native-svg',
    'react-native-svg-transformer',
    'react-native-vector-icons',
    'react-native-web',
    'rn-placeholder',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
    test: /\.js$|tsx?$/,
    // Add every directory that needs to be compiled by Babel during the build.
    include: [
        path.resolve(__dirname, 'index.web.js'), // Entry to your application
        path.resolve(__dirname, 'App.web.tsx'), // Change this to your main App file
        path.resolve(__dirname, 'src'),
        ...compileNodeModules,
    ],
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets,
            plugins: ['react-native-web'],
        },
    },
};

const svgLoaderConfiguration = {
    test: /\.svg$/,
    use: [
        {
            loader: '@svgr/webpack',
        },
    ],
};

const imageLoaderConfiguration = {
    test: /\.(gif|jpe?g|png)$/,
    use: {
        loader: 'url-loader',
        options: {
            name: '[name].[ext]',
        },
    },
};

module.exports = {
    entry: {
        app: path.join(__dirname, 'index.web.js'),
    },
    output: {
        path: path.resolve(appDirectory, 'dist'),
        publicPath: '/',
        filename: 'rnw_blogpost.bundle.js',
    },
    resolve: {
        extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
        alias: {
            'react-native$': 'react-native-web',
        },
    },
    module: {
        rules: [babelLoaderConfiguration, imageLoaderConfiguration, svgLoaderConfiguration],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            // See: https://github.com/necolas/react-native-web/issues/349
            __DEV__: JSON.stringify(true),
        }),
    ],
};
