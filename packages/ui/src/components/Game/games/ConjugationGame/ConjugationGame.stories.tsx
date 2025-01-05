import React from 'react';
import { ConjugationGame } from './ConjugationGame';
import { styledPreviewDecorator } from '../../../../storybook-decorators';
import type { Meta } from '@storybook/react';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { gameData } from '../../../../mocks/gameData';
import { Game } from '../../../../generated/graphql';

const meta: Meta<typeof ConjugationGame> = {
  title: 'games/ConjugationGame',
  component: ConjugationGame,
  decorators: [styledPreviewDecorator()]
};

const game = gameData[Game.Conjugation];

export const GameDefault = (args: GameProps) => (
  <ConjugationGame {...args} {...game} currentStage={GameStage.Initial} />
);

export const GameSuccess = (args: GameProps) => {
  return (
    <ConjugationGame {...args} {...game} currentStage={GameStage.Success} />
  );
};

export const GameError = (args: GameProps) => (
  <ConjugationGame {...args} {...game} currentStage={GameStage.Error} />
);

export default meta;
