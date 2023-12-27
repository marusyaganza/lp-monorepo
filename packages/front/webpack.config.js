const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const modeConfig = env => require(`./build-utils/webpack.${env}`);

module.exports = ({ mode = 'production', stats }) => {
  const plugins = [
    new Dotenv(),
    new HtmlWebpackPlugin({ template: './index.html' })
  ];
  if (stats) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: stats || 'disabled'
      })
    );
  }
  return merge(
    {
      entry: './index.tsx',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      },
      module: {
        rules: [
          {
            test: /\.(jpg|jpeg|png|svg|gif|webp)$/,
            type: 'asset/resource'
          },
          {
            test: /\.(woff|woff2|ttf)$/i,
            type: 'asset/resource'
          }
        ]
      },
      plugins
    },
    modeConfig(mode)
  );
};
