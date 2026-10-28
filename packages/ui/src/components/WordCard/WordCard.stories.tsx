import React from 'react';
import { WordCard, WordCardProps } from './WordCard';
import { words, spanishWords, wordWithAltSpelling } from '../../mocks/words';
import '../../assets/styles/common-styles.css';

export default {
  title: 'general/WordCard',
  component: WordCard
};

export const WordCardDefault = () => {
  return words.map(word => (
    <div key={word.name} className="page">
      <WordCard word={word} />
    </div>
  ));
};

export const WordCardWithAltSpelling = (args: WordCardProps) => {
  return wordWithAltSpelling.map(word => (
    <div key={word.name} className="page">
      <WordCard {...args} word={word} variant="full" />
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
  return words.map(word => (
    <div key={word.name} className="page">
      <WordCard {...args} word={word} {...callBacks} variant="full" />
    </div>
  ));
};
