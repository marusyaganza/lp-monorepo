import React from 'react';
import { TypeWordGame } from './TypeWordGame';
import { styledPreviewDecorator } from '../../../../storybook-decorators';
import type { Meta } from '@storybook/react';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { gameData } from '../../../../mocks/gameData';
import { Game } from '../../../../generated/graphql';

const meta: Meta<typeof TypeWordGame> = {
  title: 'games/TypeWordGame',
  component: TypeWordGame,
  decorators: [styledPreviewDecorator()]
};

const game = gameData[Game.TypeWord];

export const GameDefault = (args: GameProps) => (
  <TypeWordGame {...args} {...game} currentStage={GameStage.Initial} />
);

export const GameSuccess = (args: GameProps) => {
  return (
    <TypeWordGame
      {...args}
      {...game}
      value="wheel"
      currentStage={GameStage.Success}
      currentResult={{ type: GameStage.Success, correctAnswer: 'wheel' }}
    />
  );
};

export const GameError = (args: GameProps) => (
  <TypeWordGame
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
