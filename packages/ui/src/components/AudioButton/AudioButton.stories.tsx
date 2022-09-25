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
    }
  }
};

export const StandartButton = (args: AudioButtonProps) => (
  <div className="presentationBox">
    <AudioButton {...args} />
  </div>
);
