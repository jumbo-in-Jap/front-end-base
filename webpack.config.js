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
    index: [
      path.resolve(__dirname, './src/pug/index.pug')
    ],
    // index: [
    //   path.resolve(__dirname, 'templates/index.pug')
    // ],
    // post: [
    //   path.resolve(__dirname, 'templates/post.pug')
    // ],    
    'css/application': [
      path.resolve(__dirname, './src/sass/common.scss')
    ]
},
output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
},
module: {
    rules: [
        {
            test: /\.pug$/,
            use: ExtractTextPlugin.extract({
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
        {
            test: require.resolve('jquery'),
            use: [
            { loader: 'expose-loader', options: 'jQuery' },
            { loader: 'expose-loader', options: '$' }
            ]
        },          
        {
            test: require.resolve('tether'),
            use: [
            { loader: 'expose-loader', options: 'Tether' }
            ]
        }
    ]
},
plugins: [
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['build'] },
        files: [
            'build/css/*.css',
            'build/*.html'
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
externals: [
    {
        $: "jquery",
        jQuery: "jquery",
        'window.jQuery': 'jquery',
        Tether: 'tether'
    }
]
};
