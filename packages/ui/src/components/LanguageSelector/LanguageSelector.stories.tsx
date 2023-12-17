import { Language } from '../../generated/graphql';
import { LanguageSelector } from './LanguageSelector';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof LanguageSelector> = {
  title: 'LanguageSelector',
  component: LanguageSelector,
  decorators: [styledPreviewDecorator('centered')]
};

export const LanguageSelectorDefault = {
  args: {
    value: Language.English
  }
};

export default meta;
