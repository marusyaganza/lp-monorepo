import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { SIGN_UP } from '../../gql/mutations';
import { validators } from '@lp/ui';
import { AuthPageLayout } from '../../components/AuthPageLayout/AuthPageLayout';
import { Form } from '@lp/ui';
import { useMutation } from '@apollo/client';
import { AppContext } from '../../app-context/appContext';
import { routes } from '../../../constants/routes';
import { Spinner } from '@lp/ui';
import './SignUpPage.css';

const SignUpPage = () => {
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

  const [authFunc, { data, loading, error }] = useMutation(SIGN_UP);
  const { login } = useContext(AppContext);

  const submitHandler = (values: Record<string, string>) => {
    authFunc({ variables: { input: values } });
  };

  useEffect(() => {
    if (data) {
      const fetchedData = data.signUp;
      login(fetchedData.id, fetchedData.token);
    }
  }, [data, login]);

  return (
    <AuthPageLayout>
      <h2 className="singUpFormHeading">Sign in</h2>
      <Form
        id="signUp"
        isLoading={loading}
        className="singUpForm"
        onFormSubmit={submitHandler}
        fields={fields}
        buttonText="Sign in"
      />
      <p className="text">
        already have account?{' '}
        <Link className="link" to={`/${routes.signIn}`}>
          Sign in
        </Link>
      </p>
      <div>
        {/* temporary, romove this when notification component is ready */}
        <p className="errorMessage">{error?.message}</p>
        {/* temporary, spinner will be placed on a backdrop component */}
        {loading && <Spinner className="loader" />}
      </div>
    </AuthPageLayout>
  );
};

export default SignUpPage;
