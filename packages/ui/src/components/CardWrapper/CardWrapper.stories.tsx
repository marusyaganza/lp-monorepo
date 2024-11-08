import React from 'react';
import { CardWrapper, CardWrapperProps } from './CardWrapper';
import { WordCard } from '../WordCard/WordCard';
import { words } from '../../mocks/words';
import type { Meta } from '@storybook/react';

const renderCards = (args: CardWrapperProps) => {
  return words.map(word => (
    <div className="page" key={word.name}>
      <CardWrapper {...args}>
        <WordCard word={word} variant="short" />
      </CardWrapper>
    </div>
  ));
};

const meta: Meta<typeof CardWrapper> = {
  title: 'general/CardWrapper',
  component: CardWrapper,
  render: props => <>{renderCards(props)}</>
};

export const CardWrapperDefault = {};

export default meta;
