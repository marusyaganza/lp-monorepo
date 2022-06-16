import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '../../../../ui/src/components/form/Form';
import { InputProps } from '../../../../ui/src/components/Input/Input';
import { useNavigate } from 'react-router-dom';
import { DocumentNode, useMutation } from '@apollo/client';

import { Spinner } from '../../../../ui/src/components/Spinner/Spinner';
import { AppContext } from '../../app-context/appContext';

import { LinkType } from '../../../../types/common-types';

import './AuthForm.css';

interface AuthFormProps {
  formId: 'login' | 'signUp';
  fields: InputProps[];
  query: DocumentNode;
  link?: LinkType;
  formHeading?: string;
}

export const AuthForm = ({
  fields,
  query,
  link,
  formHeading,
  formId
}: AuthFormProps) => {
  const navigate = useNavigate();
  const [authFunc, { data, loading, error }] = useMutation(query);
  const { login, userId } = useContext(AppContext);

  const submitHandler = (values: Record<string, string>) => {
    authFunc({ variables: { input: values } });
  };

  useEffect(() => {
    if (data) {
      const fetchedData = data[formId];
      login(fetchedData.id, fetchedData.token);
    }
  }, [data, login, formId]);

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  return (
    <main className="formContainer">
      {formHeading && <h1>{formHeading}</h1>}
      <div className="loaderContainer">
        {loading && <Spinner className="loader" />}
        {error && <p className="errorMessage">{error.message}</p>}
      </div>
      <Form
        className="form"
        onFormSubmit={submitHandler}
        fields={fields}
        isLoading={loading}
      />
      {link && <Link to={link?.url}>{link?.text}</Link>}
    </main>
  );
};

AuthForm;
