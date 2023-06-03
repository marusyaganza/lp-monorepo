// const custom = require('../webpack.development.js');
module.exports = {
  // webpackFinal: async (config) => {
  //   return { ...config, module: { ...config.module, rules: [...config.module.rules,  ...custom().module.rules] } };
  // },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-css-modules",
    "storybook-addon-react-router-v6"
    ],
  "framework": "@storybook/react",
}