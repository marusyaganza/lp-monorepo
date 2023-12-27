const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  bail: true,
  output: {
    publicPath: '/',
    pathinfo: false,
    path: path.resolve(__dirname, '../public'),
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            silent: true,
            compilerOptions: { sourceMap: false }
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: false,
              modules: {
                mode: 'icss'
              }
            }
          }
        ],
        sideEffects: true
      },
      {
        test: /\.module\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: false,
              modules: {
                mode: 'local'
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        react: {
          chunks: 'initial',
          name: 'react',
          test: /node_modules\/react/,
          enforce: true
        },
        apollo: {
          chunks: 'initial',
          name: 'apollo',
          test: /node_modules\/@apollo\/client/,
          enforce: true
        },
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /node_modules\/(?!react)(?!@apollo\/client)/,
          enforce: true
        }
      }
    },
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new CompressionPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'static' }]
    })
  ],
  performance: false
};
