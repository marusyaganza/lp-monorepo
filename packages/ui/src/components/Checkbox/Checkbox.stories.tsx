import { Checkbox } from './Checkbox';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Checkbox> = {
  title: 'Checkbox',
  component: Checkbox,
  decorators: [styledPreviewDecorator()]
};

export const CheckboxDefault = {
  args: {
    label: 'Default'
  }
};

export const CheckboxIsOffensive = {
  args: {
    variant: 'isOffensive'
  }
};

export const CheckboxHidden = {
  args: {
    variant: 'hidden',
    label: 'hidden'
  }
};

export const CheckboxWithIcon = {
  args: {
    variant: 'withIcon',
    iconId: 'desc'
  }
};

export default meta;
