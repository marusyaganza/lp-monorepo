import React from 'react';
import { Button, ButtonProps, ButtonVariantType } from './Button';
import { _iconIds } from '../Icon/icon';

import '../../assets/styles/common-styles.css';

export default {
  title: 'buttons/Button',
  component: Button
};

const buttons: ButtonVariantType[] = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'success'
];

export const DefaultButtons = (args: ButtonProps) => {
  return buttons.map(btn => (
    <div key={btn} className="presentationBox">
      <Button {...args} variant={btn}>
        {btn}
      </Button>
    </div>
  ));
};

export const DisabledButtons = () => {
  return buttons.map(btn => (
    <div key={btn} className="presentationBox">
      <Button variant={btn} disabled>
        {btn}
      </Button>
    </div>
  ));
};

export const LoadingButtons = (args: ButtonProps) => {
  return buttons.map(btn => (
    <div key={btn} className="presentationBox">
      <Button isLoading {...args} variant={btn}>
        {btn}
      </Button>
    </div>
  ));
};

export const ButtonsWithIcon = () => {
  return _iconIds.map(id => (
    <div key={id} className="presentationBox">
      <Button variant="iconWithText" iconId={id}>
        {id}
      </Button>
    </div>
  ));
};

export const ActionButtons = (args: ButtonProps) => {
  return _iconIds.map(id => (
    <div key={id} className="presentationBox">
      <Button
        {...args}
        className="presentationContentItem"
        variant="primary"
        isActionButton
        iconId={id}
      >
        {id}
      </Button>
      <Button
        {...args}
        className="presentationContentItem"
        variant="secondary"
        isActionButton
        iconId={id}
      >
        {id}
      </Button>
      <Button
        {...args}
        className="presentationContentItem"
        variant="danger"
        isActionButton
        iconId={id}
      >
        {id}
      </Button>
    </div>
  ));
};

export const IconButtons = (args: ButtonProps) => {
  return _iconIds.map(id => (
    <div key={id} className="presentationBox">
      <Button {...args} variant="icon" iconId={id}>
        {id}
      </Button>
    </div>
  ));
};

IconButtons.args = {
  iconHeight: 30,
  iconWidth: 30
};
