import React from 'react';
import { AudioButton, AudioButtonProps } from './AudioButton';
import '../../assets/styles/common-styles.css';

export default {
  title: 'AudioButton',
  component: AudioButton,
  argTypes: {
    buttonText: {
      control: { type: 'text' },
      defaultValue: 'iˌɡælɪˈteəriən'
    },
    src: {
      control: { type: 'text' },
      defaultValue:
        'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3'
    },
    buttonSize: {
      control: 'number',
      defaultValue: 20,
      min: 1,
      max: 100,
      step: 1
    }
  }
};

export const StandartButton = (args: AudioButtonProps) => (
  <AudioButton {...args} />
);
