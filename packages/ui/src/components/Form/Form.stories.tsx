import { validators } from '../../utils/validators';
import { Form } from './Form';
import { InputProps } from '../Input/Input';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Form> = {
  title: 'forms/Form',
  component: Form,
  decorators: [styledPreviewDecorator()]
};

const fields: InputProps[] = [
  {
    name: 'firstName',
    type: 'text',
    required: true,
    label: 'First Name',
    autoComplete: 'given-name',
    validators: [validators.MINLENGTH(2)],
    errorText: 'first name is required'
  },
  {
    name: 'lastName',
    type: 'text',
    required: true,
    autoComplete: 'family-name',
    label: 'Last Name',
    validators: [validators.MINLENGTH(2)],
    errorText: 'first name is required'
  },
  {
    name: 'email',
    type: 'email',
    autoComplete: 'username',
    required: true,
    label: 'Email',
    validators: [validators.EMAIL()],
    errorText: 'email is required'
  },
  {
    name: 'password',
    type: 'password',
    required: true,
    label: 'Password',
    autoComplete: 'new-password',
    validators: [validators.PASSWORD()],
    errorText: 'password is required'
  },
  {
    name: 'repeatPassword',
    type: 'password',
    required: true,
    label: 'Repeat password',
    autoComplete: 'new-password',
    validators: [validators.PASSWORD()],
    errorText: "passwords don't match"
  },
  {
    name: 'primaryLanguage',
    type: 'text',
    required: false,
    label: 'Primary language',
    validators: [],
    errorText: ''
  }
];

export const FromDefault = {
  args: { fields }
};

export default meta;
