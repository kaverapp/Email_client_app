const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    entry: './src/index.js',  // Your vanilla JS entry point
    output: {
        filename: 'bundle.js',    // Output bundled JS
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // Serves from the root path

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',  // Template HTML file
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),  // Serve files from `dist` folder
        },
        open: true,
        port: 8080
    },
    mode: 'development', // or 'production'

};
