import React from 'react';
import { cleanString, isSuff } from './helpers';
import { CLOSING, OPENING } from './constants';
import './DictionaryEntity.css';

export interface DictionaryEntityProps {
  text: string;
  className?: string;
}

export const DictionaryEntity = ({
  text,
  className
}: DictionaryEntityProps) => {
  const decorateWord = (word: string) => {
    return <i className={className}>{word}</i>;
  };

  const counstuctPhrase = (string: string) => {
    const arr = string.split(' ');
    let italicPhrase: string[] = [];
    let normalPhrase: string[] = [];
    const result = [];
    let phraseOpen = false;
    arr.forEach(word => {
      const formattedWord = cleanString(`${word} `);
      if (isSuff(word, OPENING)) {
        phraseOpen = true;
        result.push(normalPhrase.join(''));
        normalPhrase = [];
      }
      if (isSuff(word, CLOSING)) {
        phraseOpen = false;
        italicPhrase.push(formattedWord);
        result.push(decorateWord(italicPhrase.join('')));
        italicPhrase = [];
      } else if (phraseOpen) {
        italicPhrase.push(formattedWord);
      } else {
        normalPhrase.push(formattedWord);
      }
    });
    result.push(normalPhrase.join(''));
    return result;
  };
  return <>{counstuctPhrase(text)}</>;
};
