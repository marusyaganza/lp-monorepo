import React from 'react';

import { LOGIN } from '../../gql/mutations';
import { validators } from '../../../../ui/src/utils/validators';
import { AuthForm } from '../../components/AuthForm/AuthForm';

const SignInPage = () => {
  const fields = [
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
    }
  ];

  return (
    <AuthForm
      query={LOGIN}
      fields={fields}
      link={{ text: 'Do not have an account? Sign up', url: '/sign-up' }}
      formHeading="Sign in"
      formId="login"
    />
  );
};

export default SignInPage;
