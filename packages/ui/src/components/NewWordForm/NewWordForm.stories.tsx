import { NewWordForm } from './NewWordForm';
import type { Meta } from '@storybook/react';
import { tags } from '../../mocks/tags';
import { Language } from '../../generated/graphql';

const meta: Meta<typeof NewWordForm> = {
  title: 'NewWordForm',
  component: NewWordForm
};

export const NewWordFormDefault = {
  args: {
    tags: tags[Language.English]
  }
};

export default meta;
