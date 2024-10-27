import React, { useMemo } from 'react';
import { InputV2 } from '../InputV2/InputV2';
import { ColorInput } from '../ColorInput/ColorInput';
import { Button } from '../Button/Button';
import { Tag } from '../Tag/Tag';
import { WordTagInput } from '../../generated/graphql';
import styles from './TagsFrom.module.css';
import { cn } from '../../utils/classnames';
import { useForm } from '../../hooks/useForm';
import { colorValidator } from '../../utils/validators';

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
  color: colorValidator
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

  const { errors, values, submitFunc, getChangeHandler } = useForm({
    initialValues: initVals,
    onSubmit,
    validators,
    defaultValues: DEFAUL_INITIAL_VALUES
  });

  return (
    <form className={cn(styles.tagsForm, className)} onSubmit={submitFunc}>
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
