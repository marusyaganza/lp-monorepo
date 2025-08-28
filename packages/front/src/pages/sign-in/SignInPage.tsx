import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { validators } from '@lp/ui';
import { AuthPageLayout } from '../../components/AuthPageLayout/AuthPageLayout';
import { Form, FormField } from '@lp/ui';
import { LoginMutation, LoginInput } from '../../generated/graphql';
import {
  useAuthContext,
  useNotificationContext,
  useEnvironmentContext
} from '../../app-context';
import { routes } from '../../constants/routes';
import llustration from '../../assets/img/login.svg';
import styles from './SignInPage.module.css';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../gql/mutations';

const SignInPage = () => {
  const fields: FormField[] = [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
      autoComplete: 'username',
      validators: [validators.EMAIL()],
      errorText: 'email is required'
    },
    {
      name: 'password',
      type: 'password',
      required: true,
      label: 'Password',
      autoComplete: 'current-password',
      validators: [validators.PASSWORD()],
      errorText: 'password is required'
    }
  ];

  const [authFunc, { data, loading, error }] =
    useMutation<LoginMutation>(LOGIN_MUTATION);
  const { login } = useAuthContext();
  const { setNotification } = useNotificationContext();
  const { isDevEnv } = useEnvironmentContext();

  const submitHandler = (values: LoginInput) => {
    authFunc({ variables: { input: values }, errorPolicy: 'all' });
  };

  useEffect(() => {
    if (data) {
      const { id, token } = data.login;
      login(id, token);
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
      <div className={styles.mainContent}>
        <div className={styles.formContainer}>
          <h2 data-cy="login-heading" className={styles.heading}>
            Sign in
          </h2>
          <Form
            data-cy="loginForm"
            id="loginForm"
            isLoading={loading}
            className={styles.form}
            onFormSubmit={submitHandler}
            fields={fields}
            buttonText="Sign in"
          />
          {isDevEnv && (
            <p className={styles.text}>
              No account?{' '}
              <Link className={styles.link} to={`/${routes.signUp}`}>
                Sign up
              </Link>
            </p>
          )}
        </div>
        <div>
          <img className={styles.image} src={llustration} alt="Sign in" />
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default SignInPage;
