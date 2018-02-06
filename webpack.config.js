var path                       = require('path');
var ExtractTextPlugin          = require('extract-text-webpack-plugin');
var BrowserSyncPlugin          = require('browser-sync-webpack-plugin');  

var Webpack               = require('webpack'); 
let extractStyles = new ExtractTextPlugin('[name].css');
let extractHtml = new ExtractTextPlugin('[name].html');
let extractjs = new ExtractTextPlugin('[name].js');

module.exports = [
    {
        /* css modules */
        entry: {
            common: './src/sass/common.scss',
            home:   './src/sass/home.scss',
            areas:  './src/sass/areas.scss',
            login:  './src/sass/login.scss',
        },
        output: {
            path: path.resolve(__dirname, "build/css"),
            publicPath: '/css/',
            filename: "[name].css"
        },
        module: {
            rules: [
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
                }
            ]
        },
        plugins: [
            extractStyles
        ]
    },
    {
        /* pug modules */
        entry: {
            'login/index': './src/pug/pages/login/login.pug',
            'home/index':  './src/pug/pages/home/home.pug',        
            'areas/index': './src/pug/pages/areas/index.pug',
            'areas/new': './src/pug/pages/areas/new.pug',
        },
        output: {
            path: path.resolve(__dirname, 'build/html'),
            publicPath: '/html/',
            filename: '[name].html'
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
                    'build/js/*.js',
                    'build/*.html'
                ]
            }),
            extractHtml
        ]
    },
    {
        /* js modules */
        entry: {
            main: "./src/js/main.js"
        },
        output: {
            path: path.resolve(__dirname, "build/js"),
            publicPath: '/js/',
            filename: "[name].js"
        },
        module: {
            rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {}
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {}
                }
            }
          ]
        },
        plugins: [
          /* use jQuery as Global */
          new Webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery"
          }),
          extractjs
        ],
        resolve: {
          extensions: ['.js']
        }
    }
]
