import { AudioButton } from './AudioButton';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof AudioButton> = {
  title: 'buttons/AudioButton',
  component: AudioButton,
  decorators: [styledPreviewDecorator()],
  parameters: {
    actions: { disable: true }
  }
};

export const StandartButton = {
  args: {
    src: 'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3',
    buttonText: 'iˌɡælɪˈteəriən'
  }
};

export const AutoPlayButton = {
  args: {
    autoplay: true,
    src: 'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3',
    iconHeight: 50,
    iconWidth: 50
  }
};

export default meta;
