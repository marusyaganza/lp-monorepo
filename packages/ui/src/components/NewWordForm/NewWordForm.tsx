import React, { useMemo } from 'react';
import { cn } from '../../utils/classnames';

import styles from './NewWordForm.module.css';
import { Language, NewWordInput } from '../../generated/graphql';
import { InputV2 } from '../InputV2/InputV2';
import { DefinitionInput } from '../DefinitionInput/DefinitionInput';
import { ArrayInput } from '../ArrayInput/ArrayInput';
import { TagSelector } from '../TagSelector/TagSelector';
import { TagType } from '../../types/types';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import {
  defsValidator,
  getStringValidator,
  stringArrayValidator
} from '../../utils/validators';
import { useForm } from '../../hooks/useForm';
import {
  cleanDefs,
  formatArrayOfStrings,
  formatString
} from '../../utils/wordFormUtils';

export interface NewWordFormProps {
  /**NewWordForm onSubmit */
  onSubmit: (values: NewWordInput) => void;
  /**additional styling */
  className?: string;
  language: Language;
  tags: TagType[];
}

const validators = {
  name: getStringValidator('name'),
  particle: getStringValidator('particle'),
  defs: defsValidator,
  shortDef: stringArrayValidator
};

function formatValues(values: NewWordInput): NewWordInput {
  const { defs, shortDef, name, alternativeSpelling } = values;
  return {
    ...values,
    name: formatString(name),
    defs: cleanDefs(defs),
    alternativeSpelling: formatArrayOfStrings(alternativeSpelling),
    shortDef: formatArrayOfStrings(shortDef)
  };
}

/**Edit word form */
export const NewWordForm = ({
  onSubmit,
  tags,
  className,
  language = Language.English
}: NewWordFormProps) => {
  const initialValues: NewWordInput = useMemo(
    () => ({
      name: '',
      audioUrl: '',
      particle: '',
      transcription: '',
      defs: [{ def: '', examples: [{ text: '', translation: '' }] }],
      imgUrl: '',
      imgDesc: '',
      shortDef: [],
      additionalInfo: '',
      alternativeSpelling: [''],
      stems: [],
      isOffensive: false,
      language
    }),
    [language]
  );

  const { errors, values, submitFunc, getChangeHandler } = useForm({
    initialValues,
    onSubmit,
    validators,
    defaultValues: initialValues,
    formatValues
  });

  return (
    <div className={cn(className)}>
      <form data-cy="wordForm" onSubmit={submitFunc}>
        <header className={styles.formHeader}>
          <h1 className={styles.heading}>Add new word</h1>
          <Button type="submit" variant="secondary">
            Save
          </Button>
        </header>

        <div className={styles.form}>
          <fieldset className={styles.column}>
            <InputV2
              dataCy="formField-name"
              name="name"
              initialValue={initialValues.name}
              onChange={getChangeHandler('name')}
              label="name"
              errorText={errors?.name}
            />
            <TagSelector
              className={styles.tagSelector}
              onChange={getChangeHandler('tags')}
              tags={tags}
              value={values.tags || []}
              label="tags"
            />
            <ArrayInput
              dataCy="formField-shortDef"
              name="shortDef"
              showOrderButtons
              onChange={getChangeHandler('shortDef')}
              initialValue={initialValues.shortDef}
              label="short definition"
              errorText={errors?.shortDef}
            />
            <DefinitionInput
              errorText={errors?.defs}
              withTranslation={language === Language.Spanish}
              onChange={getChangeHandler('defs')}
              initialValue={initialValues.defs}
            />
            <ArrayInput
              dataCy="formField-stems"
              name="stems"
              onChange={getChangeHandler('stems')}
              initialValue={initialValues.stems || []}
              label="word form"
            />
          </fieldset>
          <fieldset className={styles.column}>
            <InputV2
              dataCy="formField-particle"
              name="particle"
              errorText={errors?.particle}
              onChange={getChangeHandler('particle')}
              initialValue={initialValues.particle}
              label="particle"
            />
            <InputV2
              name="audioUrl"
              dataCy="formField-audioUrl"
              onChange={getChangeHandler('audioUrl')}
              initialValue={initialValues.audioUrl}
              label="audio url"
            />
            <InputV2
              name="imgUrl"
              dataCy="formField-imgUrl"
              onChange={getChangeHandler('imgUrl')}
              initialValue={initialValues.imgUrl}
              label="image url"
            />
            <InputV2
              name="imgDesc"
              dataCy="formField-imgDesc"
              onChange={getChangeHandler('imgDesc')}
              initialValue={initialValues.imgDesc}
              label="image description"
            />
            <ArrayInput
              dataCy="formField-alternativeSpelling"
              name="alternativeSpelling"
              onChange={getChangeHandler('alternativeSpelling')}
              initialValue={initialValues.alternativeSpelling || []}
              label="alternative spelling"
            />
            <InputV2
              dataCy="formField-additionalInfo"
              name="additionalInfo"
              onChange={getChangeHandler('additionalInfo')}
              initialValue={initialValues.additionalInfo}
              label="additional information"
            />
            <InputV2
              dataCy="formField-transcription"
              name="transcription"
              onChange={getChangeHandler('transcription')}
              initialValue={initialValues.transcription}
              label="transcription"
            />
            <Checkbox
              name="isOffensive"
              variant="isOffensive"
              onChange={getChangeHandler('isOffensive')}
              label="offensive"
            />
          </fieldset>
        </div>
      </form>
    </div>
  );
};
