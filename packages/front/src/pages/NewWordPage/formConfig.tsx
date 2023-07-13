import { DefinitionInput, InputV2, ArrayInput } from '@lp/ui';
import { FormConfigType } from '../../components/WordForm/WordForm';
import { NewWordInput, DefsInput, Language } from '../../generated/graphql';

export const defaultInitialValues: NewWordInput = {
  name: '',
  imgUrl: '',
  defs: [{ def: '', examples: [{ text: '', translation: '' }] }],
  particle: '',
  transcription: '',
  audioUrl: '',
  language: Language.English,
  shortDef: ['']
};

export const formConfig: FormConfigType<NewWordInput>[] = [
  { Component: InputV2, name: 'name' },
  { Component: InputV2, name: 'particle' },
  { Component: DefinitionInput, name: 'defs' },
  { Component: ArrayInput, name: 'shortDef', label: 'short definition' },
  { Component: InputV2, name: 'audioUrl', label: 'audio url' },
  { Component: InputV2, name: 'transcription' },
  { Component: InputV2, name: 'imgUrl', label: 'image url' },
  { Component: InputV2, name: 'imgDesc', label: 'image description' }
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
    errorText: 'shortDef is required'
  }
};
