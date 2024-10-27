import { EditWordForm } from './EditWordForm';
import type { Meta } from '@storybook/react';
import { words } from '../../mocks/words';
import { tags } from '../../mocks/tags';
import { Language } from '../../generated/graphql';

const meta: Meta<typeof EditWordForm> = {
  title: 'EditWordForm',
  component: EditWordForm
};

export const EditWordFormDefault = {
  args: {
    name: words[0].name,
    tags: tags[Language.English],
    word: words[0]
  }
};

export default meta;
