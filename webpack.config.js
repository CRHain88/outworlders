var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var envIsProd = (process.env.NODE_ENV === 'production');

var dist = path.join(__dirname, './dist/');
var distPublic = path.join(__dirname, './dist/web/');
var distStyleguide = path.join(__dirname, './dist/styleguide/');

function getWatch() {
    return (!envIsProd) ? true : false;
}

// Export Webpack configuration.
module.exports = [
    {
        name: 'css',
        entry: {
            styles: './src/web/scss/index.scss',
        },
        watch: getWatch(),
        output: {
            path: distPublic + '/css',
            filename: path.join(path.relative('./src/web/css', __dirname), '.tmp/bundle.[name].js'),
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'postcss-loader', 'sass-loader'],
                        fallback: 'style-loader',
                        publicPath: '/css/',
                    }),
                },
                // {
                //     test: /\.png$/,
                //     exclude: /(node_modules|bower_components)/,
                //     use: 'file-loader?mimetype=image/png',
                // },
                // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "url-loader?limit=10000&mimetype=application/font-woff" },
                // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader" },
            ],
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
            new ExtractTextPlugin('[name].min.css'),

            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.min\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: {removeAll: true } },
                canPrint: true
            }),

            // Copy Craft resources
            new CopyWebpackPlugin([
                { from: path.join(__dirname, './src/craft/'), to: dist + '/craft' },
            ]),

            // Copy CSS Assets to the main dist foler.
            new CopyWebpackPlugin([
                { from: path.join(__dirname, './src/web/assets/'), to: distPublic + 'assets/' },
            ]),

            // Copy the same assets to the styleguide dist foler.
            new CopyWebpackPlugin([
                { from: path.join(__dirname, './src/web/assets/'), to: distStyleguide + 'assets/' },
            ]),

            new CopyWebpackPlugin([
                { from: path.join(__dirname, './src/web/cpresources'), to: distPublic },
                { from: path.join(__dirname, './src/web/.htaccess'), to: distPublic },
                { from: path.join(__dirname, './src/web/favicon.ico'), to: distPublic },
                { from: path.join(__dirname, './src/web/index.php'), to: distPublic },
                { from: path.join(__dirname, './src/web/robots.txt'), to: distPublic },
                { from: path.join(__dirname, './src/web/web.config'), to: distPublic },
                { from: path.join(__dirname, './src/web/templates/'), to: distPublic + '/templates' },
            ]),

            new CopyWebpackPlugin([
                { from: path.join(__dirname, './package.json'), to: path.join(dist, 'package.json') },
                { from: path.join(__dirname, './README.md'), to: path.join(dist, 'README.md') },
                { from: path.join(__dirname, './LICENSE.md'), to: path.join(dist, 'LICENSE.md') },
            ]),

            // new CopyWebpackPlugin([
            //     { from: path.join(__dirname, './src/craft-dot-env-config'), to: dist + '/craft/.env' },
            //     { from: path.join(__dirname, './src/craft-general-config.php'), to:  dist + '/craft/config/general.php' },
            // ]),
        ],
    },
    {
        name: 'js',
        entry: {
            js: './src/web/js/index.js',
        },
        watch: getWatch(),
        output: {
            path: distPublic + '/js',
            filename: './bundle.[name].js',
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'imports-loader',
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                    },
                },
            ],
        },
    },
];
