const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      },
      module: {
        rules: [
          {
            test: /\.(t|j)sx?$/,
            use: { loader: 'ts-loader' },
            exclude: /node_modules/
          },
          {
            test: /\.(jpg|jpeg|png|svg|gif|webp)$/,
            type: 'asset/resource',
          },
          {
            test: /\.(woff|woff2|ttf)$/i,
            type: 'asset/resource',
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader']},
               ]
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
      },
      plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  };