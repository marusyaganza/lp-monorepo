const path = require('path');

module.exports = () => {
  return {
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'camelCase',
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              }
            }
          ]
        },
        // {
        //   enforce: 'pre',
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: 'source-map-loader'
        // }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    devtool: 'source-map'
  };
};
