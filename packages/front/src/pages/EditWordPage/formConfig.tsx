import {
  DefinitionInput,
  InputV2,
  ArrayInput,
  Checkbox,
  LevelSelector
} from '@lp/ui';
import { FormConfigType } from '../../components/WordForm/WordForm';
import {
  NewWordInput,
  UpdateWordInput,
  DefsInput,
  Word,
  Level
} from '../../generated/graphql';

type UpdateWordInputType = Omit<UpdateWordInput, 'id'>;

export const getDefaultInitialValues: (
  word?: Word
) => UpdateWordInput | undefined = word => {
  const defaultIntitalValues: UpdateWordInputType = {
    audioUrl: '',
    transcription: '',
    particle: '',
    defs: [{ def: '', examples: [{ text: '', translation: '' }] }],
    imgUrl: '',
    imgDesc: '',
    shortDef: [''],
    additionalInfo: '',
    stems: [''],
    isOffensive: false,
    isLearned: false,
    level: Level.B1
  };

  if (!word) {
    return;
  }

  const initialValues: UpdateWordInput = { id: word.id };

  const keys = Object.keys(
    defaultIntitalValues
  ) as (keyof UpdateWordInputType)[];
  keys.forEach(key => {
    // @ts-ignore
    initialValues[key] = word[key] || defaultIntitalValues[key];
  });

  return initialValues;
};

export const formConfig: (
  word: Word
) => FormConfigType<NewWordInput>[] = word => [
  { Component: InputV2, name: 'name', isDisabled: true, value: word.name },
  { Component: LevelSelector, name: 'level' },
  {
    Component: InputV2,
    name: 'particle'
  },
  {
    Component: InputV2,
    name: 'audioUrl',
    label: 'audio url'
  },
  { Component: DefinitionInput, name: 'defs' },
  { Component: InputV2, name: 'transcription' },
  {
    Component: ArrayInput,
    name: 'shortDef',
    label: 'short definition',
    props: { showOrderButtons: true }
  },
  { Component: InputV2, name: 'imgUrl', label: 'image url' },
  { Component: ArrayInput, name: 'stems', label: 'word form' },
  { Component: InputV2, name: 'imgDesc', label: 'image description' },
  {
    Component: InputV2,
    name: 'additionalInfo',
    label: 'Additional information'
  },
  {
    Component: Checkbox,
    name: 'isOffensive',
    props: { variant: 'isOffensive' }
  },
  {
    Component: Checkbox,
    name: 'isLearned',
    props: { label: 'Mark as learned' }
  }
];

export const validators = {
  defs: {
    validate: (vals?: DefsInput) => {
      if (!Array.isArray(vals)) {
        return false;
      }
      return vals.filter(val => val?.def).length > 0;
    },
    errorText: 'word definition is required'
  },
  shortDef: {
    validate: (vals?: string[]) => {
      if (!Array.isArray(vals)) {
        return false;
      }
      return vals.filter(Boolean).length > 0;
    },
    errorText: 'shortDef is required'
  },
  particle: {
    validate: (val?: string) => {
      return val ? true : false;
    },
    errorText: 'particle is required'
  }
};
