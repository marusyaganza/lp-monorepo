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
  DefsInput,
  Language,
  Level
} from '../../generated/graphql';

export const defaultInitialValues: NewWordInput = {
  name: '',
  audioUrl: '',
  particle: '',
  transcription: '',
  defs: [{ def: '', examples: [{ text: '', translation: '' }] }],
  imgUrl: '',
  imgDesc: '',
  shortDef: [],
  language: Language.English,
  additionalInfo: '',
  stems: [],
  isOffensive: false,
  level: Level.B1
};

export const formConfig: FormConfigType<NewWordInput>[] = [
  { Component: InputV2, name: 'name' },
  { Component: LevelSelector, name: 'level' },
  { Component: InputV2, name: 'particle' },
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
  name: {
    validate: (val: string) => val.length > 0,
    errorText: 'name is required'
  },
  particle: {
    validate: (val: string) => val.length > 0,
    errorText: 'particle is required'
  },
  shortDef: {
    validate: (vals?: string[]) => {
      if (!Array.isArray(vals)) {
        return false;
      }
      return vals.filter(Boolean).length > 0;
    },
    errorText: 'short definition is required'
  }
};
