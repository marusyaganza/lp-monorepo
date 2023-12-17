import React from 'react';
import { WordCard, WordCardProps } from './WordCard';
import { words, wheel, spanishWords } from '../../mocks/words';
import '../../assets/styles/common-styles.css';

export default {
  title: 'WordCard',
  component: WordCard
};

export const WordCardDefault = () => {
  return words.map(word => (
    <div key={word.name} className="page">
      <WordCard word={word} />
    </div>
  ));
};

export const WordCardShort = (args: WordCardProps) => {
  return words.map(word => (
    <div key={word.name} className="page">
      <WordCard {...args} word={word} variant="short" />
    </div>
  ));
};

export const WordCardLong = (args: WordCardProps) => {
  return wheel.map(word => (
    <div key={word.name} className="page">
      <WordCard {...args} word={word} variant="short" />
    </div>
  ));
};

export const WordCardSpanish = (args: WordCardProps) => {
  return spanishWords.map(word => (
    <div key={word.name} className="page">
      <WordCard {...args} word={word} variant="full" />
    </div>
  ));
};

export const WordCardWithButtons = (args: WordCardProps) => {
  const callBacks = {
    addButton: {
      callback: () => {
        console.log('added!');
      }
    },
    deleteButton: {
      callback: () => {
        {
          console.log('deleted!');
        }
      }
    },
    editButton: {
      callback: () => {
        console.log('edited!');
      }
    }
  };
  return wheel.map(word => (
    <div key={word.name} className="page">
      <WordCard {...args} word={word} {...callBacks} variant="full" />
    </div>
  ));
};
