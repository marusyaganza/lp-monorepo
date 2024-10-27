import React, { useMemo } from 'react';
import { cn } from '../../utils/classnames';

import styles from './EditWordForm.module.css';
import { Language, UpdateWordInput } from '../../generated/graphql';
import { InputV2 } from '../InputV2/InputV2';
import { DefinitionInput } from '../DefinitionInput/DefinitionInput';
import { ArrayInput } from '../ArrayInput/ArrayInput';
import { TagSelector } from '../TagSelector/TagSelector';
import { TagType, WordType } from '../../@types/types';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { defsValidator, stringArrayValidator } from '../../utils/validators';
import { useForm } from '../../hooks/useForm';
import { cleanDefs, formatArrayOfStrings } from '../../utils/wordFormUtils';
import { isNotEmptyString } from '../../@types/typeGuards';

export interface EditWordFormProps {
  /**EditWordForm onSubmit */
  onSubmit: (values: UpdateWordInput) => void;
  word: WordType;
  /**additional styling */
  className?: string;
  language?: Language;
  tags: TagType[];
}

function formatValues(values: UpdateWordInput): UpdateWordInput {
  const { defs, shortDef } = values;
  return {
    ...values,
    defs: defs ? cleanDefs(defs) : defs,
    shortDef: shortDef ? formatArrayOfStrings(shortDef) : shortDef
  };
}

const validators = {
  defs: defsValidator,
  shortDef: stringArrayValidator,
  particle: {
    validate: isNotEmptyString,
    errorText: 'particle is required'
  }
};

/**Edit word form */
export const EditWordForm = ({
  onSubmit,
  word,
  tags,
  className,
  language = Language.English
}: EditWordFormProps) => {
  const initialValues = useMemo(() => {
    return {
      id: word.id,
      audioUrl: word.audioUrl || '',
      transcription: word.transcription || '',
      particle: word.particle || '',
      defs: cleanDefs(word.defs) || [
        { def: '', examples: [{ text: '', translation: '' }] }
      ],
      imgUrl: word.imgUrl || '',
      imgDesc: word.imgDesc || '',
      shortDef: word.shortDef || [''],
      additionalInfo: word.additionalInfo || '',
      alternativeSpelling: word.alternativeSpelling || [''],
      isLearned: word.isLearned || false,
      tags: word.tags?.map(tag => tag?.id).filter(Boolean) || []
    };
  }, [word]);

  const { errors, values, submitFunc, getChangeHandler } = useForm({
    initialValues,
    onSubmit,
    formatValues,
    validators
  });

  return (
    <div className={cn(className)}>
      <form onSubmit={submitFunc} data-cy="wordForm">
        <header className={styles.formHeader}>
          <h1 className={styles.heading}>Edit word</h1>
          <Button type="submit" variant="secondary">
            Save
          </Button>
        </header>

        <div className={styles.form}>
          <fieldset className={styles.column}>
            <InputV2
              name="name"
              onChange={() => {}}
              initialValue={word.name}
              label="name"
              dataCy="formField-name"
              isDisabled
            />
            <TagSelector
              onChange={getChangeHandler('tags')}
              tags={tags}
              value={values.tags || []}
              label="tags"
            />
            <ArrayInput
              name="shortDef"
              dataCy="formField-shortDef"
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
              dataCy="formField-audioUrl"
              name="audioUrl"
              onChange={getChangeHandler('audioUrl')}
              initialValue={initialValues.audioUrl}
              label="audio url"
            />
            <InputV2
              dataCy="formField-imgUrl"
              name="imgUrl"
              onChange={getChangeHandler('imgUrl')}
              initialValue={initialValues.imgUrl}
              label="image url"
            />
            <InputV2
              dataCy="formField-imgDesc"
              name="imgDesc"
              onChange={getChangeHandler('imgDesc')}
              initialValue={initialValues.imgDesc}
              label="image description"
            />
            <ArrayInput
              dataCy="formField-alternativeSpelling"
              name="alternativeSpelling"
              onChange={getChangeHandler('alternativeSpelling')}
              initialValue={initialValues.alternativeSpelling}
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
              name="isLearned"
              onChange={getChangeHandler('isLearned')}
              label="Mark as learned"
            />
          </fieldset>
        </div>
      </form>
    </div>
  );
};
