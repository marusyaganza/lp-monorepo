import React, { FormEventHandler, useMemo, useState } from 'react';
import { InputV2 } from '../InputV2/InputV2';
import { ColorInput } from '../ColorInput/ColorInput';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';
import { WordTagInput } from '../../generated/graphql';
import { validateFormValues } from '../../utils/validators';
import styles from './TagsFrom.module.css';
import { cn } from '../../utils/classnames';

export type TagsFormValues = Omit<WordTagInput, 'language'>;

export interface TagsFormProps {
  onSubmit: (values: TagsFormValues) => void;
  onCancel: () => void;
  initialValues?: TagsFormValues | null;
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

export const TagsForm = function ({
  initialValues,
  onSubmit,
  onCancel,
  className
}: TagsFormProps) {
  const initVals = useMemo(() => {
    if (!initialValues) {
      return DEFAUL_INITIAL_VALUES;
    }
    const vals: TagsFormValues = DEFAUL_INITIAL_VALUES;
    const keys = Object.keys(vals) as (keyof TagsFormValues)[];
    keys.forEach(k => {
      const value = initialValues[k];
      if (value) {
        vals[k] = value;
      }
    });
    return vals;
  }, [initialValues]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState(initVals);

  const getChangeHandler = (name: keyof TagsFormValues) => {
    return function (val: string) {
      setValues(prev => ({ ...prev, [name]: val }));
    };
  };

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    const { errors, isValid } = validateFormValues(validators, values);
    if (isValid) {
      onSubmit(values);
      setValues(DEFAUL_INITIAL_VALUES);
    } else {
      setErrors(errors);
    }
  };

  return (
    <form className={cn(styles.tagsForm, className)} onSubmit={handleSubmit}>
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
