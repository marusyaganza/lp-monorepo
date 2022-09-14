/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 8080
  },
  devtool: 'source-map'
};
