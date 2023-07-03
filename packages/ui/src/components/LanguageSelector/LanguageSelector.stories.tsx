import React from 'react';
import { Language } from '../../generated/graphql';
import { LanguageSelector, LanguageSelectorProps } from './LanguageSelector';
import '../../assets/styles/common-styles.css';

export default {
  title: 'LanguageSelector',
  component: LanguageSelector,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const LanguageSelectorDefault = (args: LanguageSelectorProps) => {
  return (
    <div className="presentationBox" style={{ marginLeft: '200px' }}>
      <LanguageSelector {...args} value={Language.English} />
    </div>
  );
};
