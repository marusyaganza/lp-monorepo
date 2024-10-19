import React, {
  FormEventHandler,
  useContext,
  useState,
  FC,
  useEffect
} from 'react';
import {
  Button,
  DefinitionInputProps,
  InputV2Props,
  ArrayInputProps,
  Link,
  CheckboxProps,
  LevelSelectorProps,
  TagSelectorProps
} from '@lp/ui';
import { useForm, FormValidators } from '../../hooks/useForm';
import { Language, TagsQuery } from '../../generated/graphql';
import { AppContext } from '../../context/appContext';
import { routes } from '../../constants/routes';
import styles from './WordForm.module.css';
import { TAGS_QUERY } from '../../gql/queries';
import { useQuery } from '@apollo/client';
import { PageSpinner } from '../PageSpinner/PageSpinner';

type ComponentProps = InputV2Props &
  DefinitionInputProps &
  ArrayInputProps &
  CheckboxProps &
  LevelSelectorProps;

//TODO create separate interface for each field type and inherit it from base field interface
export interface FormConfigType<T extends Record<string, unknown>> {
  Component: FC<ComponentProps>;
  name: keyof T & string;
  label?: string;
  isDisabled?: boolean;
  value?: string;
  props?: Partial<
    | InputV2Props
    | DefinitionInputProps
    | ArrayInputProps
    | CheckboxProps
    | LevelSelectorProps
    | TagSelectorProps
  >;
}

export interface WordFormProps<T extends Record<string, unknown>> {
  initialValues: T;
  formConfig: FormConfigType<T>[];
  onSubmit: (values: T) => void;
  validators?: FormValidators<T>;
  isLoading?: boolean;
  validate?: (values: T) => Record<string, string>;
}

export function WordForm<T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  validators,
  formConfig,
  isLoading
}: WordFormProps<T>) {
  const [{ values, changeHandler, validate }] = useForm<T>(
    initialValues,
    validators
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { language, setNotification } = useContext(AppContext);
  const { error, loading, data } = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const { errors, isValid } = validate();
    if (isValid) {
      onSubmit(values);
    }
    setErrors(errors);
  };

  const getChangeHandler = (name: keyof T & string) => {
    return function (val: unknown) {
      // @ts-ignore
      changeHandler({ [name]: val });
    };
  };

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [error]);

  const renderInputs = () => {
    return formConfig.map(field => {
      const { Component, name, label, props = {}, isDisabled, value } = field;
      const tags = name === 'tags' ? data?.tags : undefined;
      const initialValue = values[name] || value;
      return (
        <Component
          className={styles.formField}
          // @ts-ignore
          initialValue={initialValue}
          dataCy={`formField-${name}`}
          key={name}
          value={values[name]}
          withTranslation={name === 'defs' && language === Language.Spanish}
          name={name}
          tags={tags}
          // @ts-ignore
          label={label || name}
          isDisabled={isDisabled}
          // @ts-ignore
          onChange={getChangeHandler(name)}
          errorText={errors[name]}
          {...props}
        />
      );
    });
  };

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleFormSubmit}
      data-cy="wordForm"
    >
      <div className={styles.formFields}>{renderInputs()}</div>
      <div className={styles.buttonContainer}>
        <Link variant="button" to={`/${routes.words}`}>
          Cancel
        </Link>
        <Button variant="secondary" type="submit" isLoading={isLoading}>
          Save
        </Button>
      </div>
    </form>
  );
}
