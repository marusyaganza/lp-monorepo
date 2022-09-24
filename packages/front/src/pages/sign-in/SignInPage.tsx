import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { LOGIN } from '../../gql/mutations';
import { validators } from '@lp/ui';
import { AuthPageLayout } from '../../components/AuthPageLayout/AuthPageLayout';
import { Form } from '@lp/ui';
import { useMutation } from '@apollo/client';
import { AppContext } from '../../app-context/appContext';
import { routes } from '../../../constants/routes';
import llustration from '../../assets/img/login.svg';

import './SignInPage.css';

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

  const [authFunc, { data, loading, error }] = useMutation(LOGIN);
  const { login, setNotification } = useContext(AppContext);

  const submitHandler = (values: Record<string, string>) => {
    authFunc({ variables: { input: values } });
  };

  useEffect(() => {
    if (data) {
      const fetchedData = data.login;
      login(fetchedData.id, fetchedData.token);
    }
  }, [data, login]);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message
      });
    }
  }, [error, setNotification]);

  return (
    <AuthPageLayout>
      <div className="mainContent">
        <div className="formContainer">
          <h2 className="heading">Sign in</h2>
          <Form
            id="loginForm"
            isLoading={loading}
            className="form"
            onFormSubmit={submitHandler}
            fields={fields}
            buttonText="Sign in"
          />
          <p className="text">
            No account?{' '}
            <Link className="link" to={`/${routes.signUp}`}>
              Sign up
            </Link>
          </p>
        </div>
        <div>
          <img src={llustration} alt="Sign in" />
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default SignInPage;
