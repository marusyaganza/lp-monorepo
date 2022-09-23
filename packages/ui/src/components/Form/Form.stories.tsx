import React from 'react';
import { validators } from '../../utils/validators';
import { Form, FormProps } from './Form';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Form',
  component: Form,
  argTypes: {
    fields: {
      control: false
    }
  }
};

const fields = [
  {
    name: 'firstName',
    type: 'text',
    required: true,
    label: 'First Name',
    validators: [validators.MINLENGTH(2)],
    errorText: 'first name is required'
  },
  {
    name: 'lastName',
    type: 'text',
    required: true,
    label: 'Last Name',
    validators: [validators.MINLENGTH(2)],
    errorText: 'first name is required'
  },
  {
    name: 'email',
    type: 'text',
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
    validators: [validators.PASSWORD()],
    errorText: 'password is required'
  },
  {
    name: 'repeatPassword',
    type: 'password',
    required: true,
    label: 'Repeat password',
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

export const FromDefault = (args: FormProps) => {
  return (
    <div className="presentationBox">
      <Form {...args} fields={fields} />
    </div>
  );
};
