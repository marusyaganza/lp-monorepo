import { dirname, join } from 'path';

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: [{ from: '../static/images', to: '/images' }],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('storybook-css-modules')
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {}
  },

  docs: {
    autodocs: true
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
