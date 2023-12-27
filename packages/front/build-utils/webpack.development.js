const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'ts-loader' },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                mode: 'local'
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    // client: {
    //   overlay: false
    // },
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build')
    },
    compress: true,
    port: 8080
  },
  devtool: 'source-map'
};
