var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var envIsProd = (process.env.NODE_ENV === 'production');

var dist = path.join(__dirname, './dist/');
var distPublic = path.join(__dirname, './dist/public/');

// Conditionally return a list of plugins to use based on the current environment.
// Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins(customPlugins) {
    var plugins = [];

    if (customPlugins instanceof Array) {
        plugins = plugins.concat(customPlugins);
    }

    // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': process.env.NODE_ENV,
        },
    }));

    // Copy config files.
    // This must come before the generic folder for the settings to take hold.
    // plugins.push(new CopyWebpackPlugin([
    //     { from: path.join(__dirname, './src/craft-db-config.php'),      to: dist + 'craft/config/db.php' },
    //     { from: path.join(__dirname, './src/craft-general-config.php'), to: dist + 'craft/config/general.php' },
    //     { from: path.join(__dirname, './src/craft-license.key'),        to: dist + 'craft/config/license.key' },
    // ]));

    console.log(distPublic + 'assets/');

    plugins.push(new CopyWebpackPlugin([
        { from: path.join(__dirname, './package.json'),             to: dist + 'package.json' },
        { from: path.join(__dirname, './README.md'),                to: dist + 'README.md' },
        { from: path.join(__dirname, './LICENSE.md'),               to: dist + 'LICENSE.md' },
        { from: path.join(__dirname, './src/asset/'),               to: distPublic + 'assets/' },
        // { from: path.join(__dirname, './src/craft/'),               to: dist + 'craft' },
        // { from: path.join(__dirname, './src/public/templates/'),    to: distPublic + 'templates' },
        // { from: path.join(__dirname, './src/public/assets/fonts/'), to: distPublic + 'assets/fonts' },
        // {
        //     context: path.join(__dirname, './src/public'),
        //     from: { glob: '*', dot: true },
        //     to: distPublic,
        // },
    ]));

    if (envIsProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    } else {
        plugins.push(new CopyWebpackPlugin([
            { from: path.join(__dirname, './uploads/'), to: dist + '/uploads' },
        ]));
    }

    return plugins;
}

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
        ],
    },
];
