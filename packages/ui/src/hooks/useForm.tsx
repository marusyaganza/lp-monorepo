import React, {
  FormEvent,
  FormHTMLAttributes,
  PropsWithChildren,
  useCallback,
  useState
} from 'react';
import { FormValidator, validateFormValues } from '../utils/validators';

export interface UseFormArgs<T extends Record<string, unknown>> {
  initialValues: T;
  defaultValues?: T;
  validators: Partial<Record<keyof T, FormValidator>>;
  formatValues?: (data: any) => T;
  onSubmit: (values: T) => void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  onSubmit,
  validators,
  defaultValues,
  formatValues
}: UseFormArgs<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { errors, isValid } = validateFormValues(validators, values);
    const formattedValues = formatValues ? formatValues(values) : values;
    if (isValid) {
      onSubmit(formattedValues);
      if (defaultValues) {
        setValues(defaultValues);
      }
    } else {
      setErrors(errors);
    }
  };

  const getChangeHandler = useCallback((name: keyof T) => {
    return function onFieldChange<T>(val: T) {
      setValues(prev => ({ ...prev, [name]: val }));
    };
  }, []);

  const Form = ({
    children,
    ...rest
  }: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) => {
    return (
      <form onSubmit={handleFormSubmit} {...rest}>
        {children}
      </form>
    );
  };

  return {
    Form,
    getChangeHandler,
    errors,
    values,
    setValues,
    submitFunc: handleFormSubmit
  };
}
