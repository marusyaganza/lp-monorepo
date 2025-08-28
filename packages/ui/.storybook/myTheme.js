import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  // Brand colors
  colorPrimary: '#3914af', // primary-100
  colorSecondary: '#c0b2ee', // secondary-300

  // UI colors
  appBg: '#f7f7f7', // neutral-100 (background)
  appContentBg: '#f0f0f0', // neutral-200
  appBorderColor: '#c8c8c8', // neutral-400
  appBorderRadius: 6,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#000000',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar colors
  barTextColor: '#242943', // neutral-800 for text on toolbar
  barSelectedColor: '#3914af', // primary-300 for selected tab
  barBg: '#fda50f', // secondary-100 for toolbar background

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#a1a1a1',
  inputTextColor: '#000000',
  inputBorderRadius: 6,

  // Branding
  brandTitle: 'Language Power UI',
  brandUrl: 'https://github.com/marusyaganza/lp-monorepo'
});
