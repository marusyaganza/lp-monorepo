import React from 'react';
import { TagsForm, TagsFormProps } from './TagsForm';
import type { Meta } from '@storybook/react';
import { tags } from '../../mocks/tags';

const meta: Meta<typeof TagsForm> = {
  title: 'forms/TagsForm',
  component: TagsForm
};

export const TagsFormDefault = {};

export const WithInitialValues = (args: TagsFormProps) => {
  return <TagsForm {...args} initialValues={tags.ENGLISH[0]} />;
};

export default meta;
