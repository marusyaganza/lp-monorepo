import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';

import { Spinner } from '../../../../ui/src/components/Spinner/Spinner';
import { Form } from '../../../../ui/src/components/form/Form';
import { LOGIN } from '../../gql/mutations';
import { AppContext } from '../../app-context/appContext';
import './SignInPage.css';
import { validators } from '../../../../ui/src/utils/validators';

const SignInPage = () => {
  const navigate = useNavigate();
  const [signIn, { data, loading, error }] = useMutation(LOGIN);
  const { login, userId } = useContext(AppContext);

  const submitHandler = (values: Record<string, string>) => {
    signIn({ variables: { input: values } });
  };

  useEffect(() => {
    if (data) {
      login(data.login.id, data.login.token);
    }
  }, [data]);

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, [userId]);

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
    <>
      <main className="singInPageContainer">
        {error && <p className="loginError">{error.message}</p>}
        {loading && <Spinner />}
        <Form
          className="signInForm"
          onFormSubmit={submitHandler}
          fields={fields}
        />
      </main>
    </>
  );
};

export default SignInPage;
