import React, { FormEventHandler, useState } from 'react';
import { Button, ColorInput, InputV2, Tag, cn } from '@lp/ui';
import { useForm } from '../../hooks/useForm';
import { WordTagInput } from '../../generated/graphql';
import styles from './TagsFrom.module.css';

export interface TagsFormProps<T extends Omit<WordTagInput, 'language'>> {
  onSubmit: (values: T) => void;
  onCancel: () => void;
  initialValues?: T | null;
  className?: string;
}

const DEFAUL_INITIAL_VALUES = {
  text: '',
  desc: '',
  color: ''
};

const validators = {
  text: {
    validate: (val: string) => val.length > 0,
    errorText: 'tag text is required'
  },
  color: {
    validate: (val: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val),
    errorText: 'tag color should be a valid hex color'
  }
};

export const TagsForm = function <T extends Omit<WordTagInput, 'language'>>({
  initialValues,
  onSubmit,
  onCancel,
  className
}: TagsFormProps<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [{ values, changeHandler, validate }] = useForm<T>(
    // @ts-ignore
    initialValues || DEFAUL_INITIAL_VALUES,
    validators
  );

  const onFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const { errors, isValid } = validate();
    if (isValid) {
      onSubmit(values);
    }
    setErrors(errors);
  };

  const getChangeHandler = (name: keyof T) => {
    return function (val: string) {
      // @ts-ignore
      changeHandler({ [name]: val });
    };
  };

  return (
    <form className={cn(styles.tagsForm, className)} onSubmit={onFormSubmit}>
      <div className={styles.formFields}>
        <div className={styles.tagDisplayContainer}>
          <Tag className={styles.tagDisplay} {...values} />
        </div>
        <InputV2
          name="text"
          initialValue={initialValues?.text}
          className={styles.text}
          onChange={getChangeHandler('text')}
          errorText={errors.text}
          label="text"
        />
        <InputV2
          name="desc"
          initialValue={initialValues?.desc}
          className={styles.desc}
          onChange={getChangeHandler('desc')}
          errorText={errors.desc}
          label="desc"
        />
        <ColorInput
          name="color"
          initialValue={initialValues?.color}
          onChange={getChangeHandler('color')}
          errorText={errors.color}
          label="color"
        />
      </div>
      <div className={styles.buttonsBlock}>
        <Button variant="secondary" type="submit">
          Save
        </Button>
        <Button
          variant="icon"
          iconId="close"
          iconHeight={30}
          iconWidth={30}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
