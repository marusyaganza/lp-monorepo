const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const modeConfig = env => require(`./build-utils/webpack.${env}`);

module.exports = ({ mode = 'production', envFile }) => {
  const plugins = [
    new Dotenv({ path: envFile || '.env', systemvars: true }),
    new HtmlWebpackPlugin({ template: './index.html' })
  ];
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
