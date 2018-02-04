var path                       = require('path');
var ExtractTextPlugin          = require('extract-text-webpack-plugin');
var BrowserSyncPlugin          = require('browser-sync-webpack-plugin');  
var WebpackBuildNotifierPlugin = require('webpack-build-notifier'); 
var Autoprefixer               = require('autoprefixer'); 

var Webpack               = require('webpack'); 
let extractStyles = new ExtractTextPlugin('[name].css');
let extractHtml = new ExtractTextPlugin('[name].html');

module.exports = {
stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
},
entry: {
    'pages/login': './src/pug/pages/login.pug',
    'pages/home': './src/pug/pages/home.pug',
    'pages/areas/index': './src/pug/pages/areas/index.pug',
    'pages/areas/new': './src/pug/pages/areas/new.pug',
    'css/common': './src/sass/common.scss',
    'css/login': './src/sass/login.scss',
    'css/home': './src/sass/home.scss',
    'css/areas': './src/sass/areas.scss',
    'common': './src/js/app'
},
output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
},
module: {
    rules: [
        {
            test: /\.pug$/,
            use: extractHtml.extract({
                use: [
                    { loader: 'html-loader'},
                    { loader: 'pug-html-loader?pretty&exports=false'}
                ]
            })
        },
        {
            test: /\.scss$/,
            use: extractStyles.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
        },
        // {
        //     test: require.resolve('jquery'),
        //     use: [
        //     { loader: 'expose-loader', options: 'jQuery' },
        //     { loader: 'expose-loader', options: '$' }
        //     ]
        // },          
        // {
        //     test: require.resolve('tether'),
        //     use: [
        //     { loader: 'expose-loader', options: 'Tether' }
        //     ]
        // }
    ]
},
plugins: [
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['build'] },
        files: [
            'build/css/*.css',
            'build/pages/*.html'
        ]
    }),
    new Webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
        options: {
            postcss: [
            Autoprefixer({
                browsers: ['last 2 version', 'Explorer >= 10', 'Android >= 4']
            })
            ],
            sassLoader: {
            includePaths: [
                path.resolve(__dirname, 'node_modules/sanitize.css/')
            ]
            }
        }
        }),
    extractStyles,
    extractHtml
],
// externals: [
//     {
//         $: "jquery",
//         jQuery: "jquery",
//         'window.jQuery': 'jquery',
//         Tether: 'tether'
//     }
// ]
};
