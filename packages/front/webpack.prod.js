const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'public'),
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
      plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  };