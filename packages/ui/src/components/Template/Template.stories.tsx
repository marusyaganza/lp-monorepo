import React from 'react';
import { Template, TemplateProps } from './Template';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Template',
  component: Template,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const TemplateDefault = (args: TemplateProps) => {
  return (
    <div className="presentationBox">
      <Template {...args} />
    </div>
  );
};
