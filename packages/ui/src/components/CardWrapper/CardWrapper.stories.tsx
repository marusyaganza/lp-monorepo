import React from 'react';
import { CardWrapper } from './CardWrapper';
import { WordCard } from '../WordCard/WordCard';
import { words } from '../../mocks/words';
import '../../assets/styles/common-styles.css';

export default {
  title: 'CardWrapper',
  component: CardWrapper,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const CardWrapperDefault = () => {
  return words.map(word => (
    <>
      <div className="page">
        <CardWrapper>
          <WordCard word={word} variant="short" />
        </CardWrapper>
      </div>
    </>
  ));
};
