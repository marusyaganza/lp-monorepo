import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { validators } from '@lp/ui';
import { AuthPageLayout } from '../../components/AuthPageLayout/AuthPageLayout';
import { Form, FormField } from '@lp/ui';
import { useSignUpMutation, SignUpInput } from '../../generated/graphql';
import { AppContext } from '../../app-context/appContext';
import { routes } from '../../constants/routes';

import styles from './SignUpPage.module.css';

const SignUpPage = () => {
  const fields: FormField[] = [
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
      label: 'Last Name',
      autoComplete: 'family-name',
      validators: [validators.MINLENGTH(2)],
      errorText: 'first name is required'
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
      autoComplete: 'new-password',
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

  const [authFunc, { data, loading, error }] = useSignUpMutation();
  const { login, setNotification, isDevEnv } = useContext(AppContext);
  const navigate = useNavigate();

  const submitHandler = (values: SignUpInput) => {
    authFunc({ variables: { input: values } });
  };

  useEffect(() => {
    if (data) {
      const fetchedData = data.signUp;
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

  useEffect(() => {
    if (!isDevEnv) {
      navigate('/sign-in');
    }
  }, [isDevEnv, navigate]);

  return (
    <AuthPageLayout>
      <h2 className={styles.formHeading}>Sign up</h2>
      <Form
        id="signUp"
        isLoading={loading}
        className={styles.form}
        onFormSubmit={submitHandler}
        fields={fields}
        buttonText="Sign up"
      />
      <p className={styles.text}>
        already have account?{' '}
        <Link className={styles.link} to={`/${routes.signIn}`}>
          Sign in
        </Link>
      </p>
    </AuthPageLayout>
  );
};

export default SignUpPage;
