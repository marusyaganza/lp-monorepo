import React from 'react';
import { DefinitionInput, DefinitionInputProps } from './DefinitionInput';
import '../../assets/styles/common-styles.css';

export default {
  title: 'DefinitionInput',
  component: DefinitionInput,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const DefinitionInputDefault = (args: DefinitionInputProps) => {
  return (
    <div className="presentationBox">
      <DefinitionInput
        {...args}
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const DefinitionInputWithInitialDef = (args: DefinitionInputProps) => {
  return (
    <div className="presentationBox">
      <DefinitionInput
        {...args}
        initialValue={[{ def: 'Def 1' }, { def: 'Def 2' }, { def: 'Def 3' }]}
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const DefinitionInputWithInitialDefAndExample = (
  args: DefinitionInputProps
) => {
  return (
    <div className="presentationBox">
      <DefinitionInput
        {...args}
        initialValue={[{ def: 'Def 1', examples: [{ text: 'Example' }] }]}
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const DefinitionInputWithTranslation = (args: DefinitionInputProps) => {
  return (
    <div className="presentationBox">
      <DefinitionInput
        {...args}
        withTranslation
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};
