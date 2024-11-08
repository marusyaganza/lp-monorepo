import React from 'react';
import { SelectWordGame } from './SelectWordGame';
import { styledPreviewDecorator } from '../../../../storybook-decorators';
import type { Meta } from '@storybook/react';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { gameData } from '../../../../mocks/gameData';
import { Game } from '../../../../generated/graphql';

const meta: Meta<typeof SelectWordGame> = {
  title: 'games/SelectWordGame',
  component: SelectWordGame,
  decorators: [styledPreviewDecorator()]
};

const game = gameData[Game.SelectWord];

export const GameDefault = (args: GameProps) => (
  <SelectWordGame {...args} {...game} currentStage={GameStage.Initial} />
);

export const GameSuccess = (args: GameProps) => {
  return (
    <SelectWordGame
      {...args}
      {...game}
      value="wheel"
      currentStage={GameStage.Success}
      currentResult={{ type: GameStage.Success, correctAnswer: 'wheel' }}
    />
  );
};

export const GameError = (args: GameProps) => (
  <SelectWordGame
    {...args}
    {...game}
    value="flower"
    currentStage={GameStage.Error}
    currentResult={{
      type: 'error',
      correctAnswer: 'wheel',
      incorrectAnswer: 'flower'
    }}
  />
);

export default meta;
