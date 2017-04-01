var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var envIsProd = (process.env.NODE_ENV === 'production');

var dist = path.join(__dirname, './dist/');
var distPublic = path.join(__dirname, './dist/public/');
var distStyleguide = path.join(__dirname, './dist/styleguide/');

function getWatch() {
    return (!envIsProd) ? true : false;
}

// Export Webpack configuration.
module.exports = [
    {
        name: 'css',
        entry: {
            styles: './src/public/scss/index.scss',
        },
        watch: getWatch(),
        output: {
            path: distPublic + '/css',
            filename: path.join(path.relative('./src/public/css', __dirname), '.tmp/bundle.[name].js'),
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
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),

            // Copy CSS Assets to the main dist foler.
            new CopyWebpackPlugin([
                { from: path.join(__dirname, './src/public/assets/'), to: distPublic + 'assets/' },
            ]),

            // Copy the same assets to the styleguide dist foler.
            new CopyWebpackPlugin([
                { from: path.join(__dirname, './src/public/assets/'), to: distStyleguide + 'assets/' },
            ]),
        ],
    },
];
