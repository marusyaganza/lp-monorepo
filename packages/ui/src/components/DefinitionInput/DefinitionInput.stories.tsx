import { DefinitionInput } from './DefinitionInput';
import '../../assets/styles/common-styles.css';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof DefinitionInput> = {
  title: 'inputs/DefinitionInput',
  component: DefinitionInput,
  decorators: [styledPreviewDecorator()]
};

export const DefinitionInputDefault = {};
export const DefinitionInputWithInitialDef = {
  args: { initialValue: [{ def: 'Def 1' }, { def: 'Def 2' }, { def: 'Def 3' }] }
};

export const DefinitionInputWithInitialDefAndExample = {
  args: {
    initialValue: [{ def: 'Def 1', examples: [{ text: 'Example' }] }]
  }
};

export const DefinitionInputWithTranslation = {
  args: {
    withTranslation: true
  }
};

export default meta;
