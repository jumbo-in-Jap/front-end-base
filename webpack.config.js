var path                       = require('path');
var ExtractTextPlugin          = require('extract-text-webpack-plugin');
var BrowserSyncPlugin          = require('browser-sync-webpack-plugin');  
var WebpackBuildNotifierPlugin = require('webpack-build-notifier'); 

module.exports = {
devtool: 'source-map',
entry: {
    style: './src/sass/main.scss'
},
output: {
    path: path.join(__dirname, 'dist/css'),
    filename: '[name].css'
},
module: {
    rules: [
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development 
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
    new WebpackBuildNotifierPlugin(),
    new ExtractTextPlugin('[name].css'),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] },
        files: [
            'dist/*.css',
            'dist/html/*.html'
        ]
    })
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
