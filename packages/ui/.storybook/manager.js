import { addons } from '@storybook/addons';
import myTheme from './myTheme';

addons.setConfig({
  theme: myTheme,
  // full-height preview: game stories need the vertical space more than the controls do
  panelPosition: 'right'
});
