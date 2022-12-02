import React, { ChangeEvent, FormEventHandler, useState } from 'react';
import { Button, DefinitionInput } from '@lp/ui';
import { Input } from '@lp/ui';
import { WordType, DefinitionType } from '@lp/types';

interface WordFormProps {
  initialValues?: Partial<WordType>;
  onSubmit: (values: Partial<WordType>) => void;
  validate?: (values: Partial<WordType>) => Record<string, string>;
}

const defaultInitialValues: Partial<WordType> = {
  name: '',
  imgUrl: '',
  defs: [],
  particle: '',
  transcription: '',
  audioUrl: ''
};

const requiredFields = ['name', 'defs'];

export const WordForm = ({
  initialValues,
  onSubmit,
  validate
}: WordFormProps) => {
  const [values, setValues] = useState<Partial<WordType>>({
    ...defaultInitialValues,
    ...initialValues
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const defChangeHandler = (val: DefinitionType[]) => {
    setValues(prev => ({ ...prev, defs: val }));
  };
  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  const onFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    let errors = {};
    if (validate) {
      errors = validate(values);
    }
    if (!Object.keys(errors).length) {
      onSubmit(values);
    }
    setErrors(errors);
  };

  return (
    <form onSubmit={onFormSubmit}>
      {Object.keys(defaultInitialValues).map(key => {
        if (key === 'defs') {
          return (
            <DefinitionInput
              key={key}
              errorText={errors?.defs}
              initialValue={initialValues?.defs}
              onChange={defChangeHandler}
            />
          );
        } else {
          return (
            <Input
              required={requiredFields.includes(key)}
              key={key}
              name={key}
              label={key}
              onChange={textChangeHandler}
              // @ts-ignore
              value={values?.[key]}
            />
          );
        }
      })}
      {/* <Input
        name="name"
        label="name"
        onChange={textChangeHandler}
        value={values.name}
      />
      <Input name="particle" label="particle" onChange={textChangeHandler} />
      <Input
        name="transcription"
        label="transcription"
        onChange={textChangeHandler}
      />
      <Input name="imgUrl" label="imgUrl" onChange={textChangeHandler} /> */}
      <Button type="submit">Save</Button>
    </form>
  );
};
