import React from 'react';

import { SIGN_UP } from '../../gql/mutations';
import { validators } from '@lp/ui';
import { AuthForm } from '../../components/AuthForm/AuthForm';

const SignUpPage = () => {
  const fields = [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
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
    }
  ];

  return (
    <AuthForm
      query={SIGN_UP}
      link={{ text: 'Already have an account? Login', url: '/sign-in' }}
      fields={fields}
      formHeading="Sign up"
      formId="signUp"
    />
  );
};

export default SignUpPage;
