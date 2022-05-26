const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../public'),
      },
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ],
      },
      optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            terserOptions: {
              format: {
                  comments: false,
              },
            },
            extractComments: false,
        })
        ],
      },
      plugins: [
        new MiniCssExtractPlugin(), 
        new CompressionPlugin(), 
        new CopyPlugin({
        patterns: [
          { from: 'static'},
        ],
      })
      ],
  };