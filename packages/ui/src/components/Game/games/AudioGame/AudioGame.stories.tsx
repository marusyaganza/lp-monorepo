import React from 'react';
import { AudioGame } from './AudioGame';
import { styledPreviewDecorator } from '../../../../storybook-decorators';
import type { Meta } from '@storybook/react';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { gameData } from '../../../../mocks/gameData';
import { Game } from '../../../../generated/graphql';

const meta: Meta<typeof AudioGame> = {
  title: 'games/AudioGame',
  component: AudioGame,
  decorators: [styledPreviewDecorator()]
};

const game = gameData[Game.Audio];

export const GameDefault = (args: GameProps) => (
  <AudioGame {...args} {...game} currentStage={GameStage.Initial} />
);

export const GameSuccess = (args: GameProps) => {
  return (
    <AudioGame
      {...args}
      {...game}
      value="wheel"
      currentStage={GameStage.Success}
      currentResult={{ type: GameStage.Success, correctAnswer: 'wheel' }}
    />
  );
};

export const GameError = (args: GameProps) => (
  <AudioGame
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
