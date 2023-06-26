import React from 'react';
import { WordCard, WordCardProps } from './WordCard';
import { words, wheel } from '../../mocks/words';
import '../../assets/styles/common-styles.css';

export default {
  title: 'WordCard',
  component: WordCard,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const WordCardDefault = (args: WordCardProps) => {
  return words.map(word => (
    <>
      <div className="page">
        <WordCard {...args} word={word} />
      </div>
    </>
  ));
};

export const WordCardShort = (args: WordCardProps) => {
  return words.map(word => (
    <>
      <div className="page">
        <WordCard {...args} word={word} variant="short" />
      </div>
    </>
  ));
};

export const WordCardLong = (args: WordCardProps) => {
  return wheel.map(word => (
    <>
      <div className="page">
        <WordCard {...args} word={word} variant="short" />
      </div>
    </>
  ));
};
