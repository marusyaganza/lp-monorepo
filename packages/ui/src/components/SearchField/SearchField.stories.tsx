import { SearchField } from './SearchField';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof SearchField> = {
  title: 'inputs/SearchField',
  component: SearchField,
  decorators: [styledPreviewDecorator()]
};

export const SearchFieldDefault = {};

export default meta;
