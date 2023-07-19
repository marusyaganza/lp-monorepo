import React from 'react';
import { Level } from '../../generated/graphql';
import { LevelSelector, LevelSelectorProps } from './LevelSelector';
import '../../assets/styles/common-styles.css';

export default {
  title: 'LevelSelector',
  component: LevelSelector,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const LevelSelectorDefault = (args: LevelSelectorProps) => {
  return (
    <div className="presentationBox" style={{ marginLeft: '200px' }}>
      <LevelSelector
        {...args}
        initialValue={Level.A1}
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};
