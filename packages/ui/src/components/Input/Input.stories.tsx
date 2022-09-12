import React from 'react';
import { Input } from './Input';

export default {
  title: 'Input',
  component: Input
};

const props = {
  name: 'TextInput',
  label: 'Text input',
  errorText: 'Text is requierd'
};

export const InputError = () => <Input {...props} isValid={false} />;

export const InputComponent = () => <Input {...props} />;
