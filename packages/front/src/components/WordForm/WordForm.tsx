import React, { FormEventHandler, useContext, useState, FC } from 'react';
import {
  Button,
  DefinitionInputProps,
  InputV2Props,
  ArrayInputProps,
  Link,
  CheckboxProps,
  LevelSelectorProps
} from '@lp/ui';
import { useForm, FormValidators } from '../../hooks/useForm';
import { Language } from '../../generated/graphql';
import { AppContext } from '../../app-context/appContext';
import { routes } from '../../../constants/routes';
import styles from './WordForm.module.css';

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
  const { language } = useContext(AppContext);

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

  const renderInputs = () => {
    return formConfig.map(field => {
      const { Component, name, label, props = {}, isDisabled, value } = field;
      const initialValue = values[name] || value;
      return (
        <Component
          // @ts-ignore
          initialValue={initialValue}
          key={name}
          withTranslation={name === 'defs' && language === Language.Spanish}
          name={name}
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

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
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
