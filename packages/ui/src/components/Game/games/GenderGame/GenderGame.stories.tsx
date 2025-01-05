import React from 'react';
import { GenderGame } from './GenderGame';
import { styledPreviewDecorator } from '../../../../storybook-decorators';
import type { Meta } from '@storybook/react';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { gameData } from '../../../../mocks/gameData';
import { Game } from '../../../../generated/graphql';

const meta: Meta<typeof GenderGame> = {
  title: 'games/GenderGame',
  component: GenderGame,
  decorators: [styledPreviewDecorator()]
};

const game = gameData[Game.Gender];

export const GameDefault = (args: GameProps) => (
  <GenderGame {...args} {...game} currentStage={GameStage.Initial} />
);

export const GameSuccess = (args: GameProps) => {
  return <GenderGame {...args} {...game} currentStage={GameStage.Success} />;
};

export const GameError = (args: GameProps) => (
  <GenderGame {...args} {...game} currentStage={GameStage.Error} />
);

export default meta;
