import { Template } from './Template';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Template> = {
  title: 'Template',
  component: Template,
  decorators: [styledPreviewDecorator()]
};
export default meta;

export const TemplateDefault = {
  args: {
    prop: 'prop text'
  }
};
