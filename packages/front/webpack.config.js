const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge')

const modeConfig = env =>
  require(`./build-utils/webpack.${env}`);

module.exports = ({mode='production'}) => {
    return merge({
    entry: './index.tsx',
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
  }, modeConfig(mode))};