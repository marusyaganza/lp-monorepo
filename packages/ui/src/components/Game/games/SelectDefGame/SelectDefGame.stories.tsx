import React from 'react';
import { SelectDefGame } from './SelectDefGame';
import { styledPreviewDecorator } from '../../../../storybook-decorators';
import type { Meta } from '@storybook/react';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { gameData } from '../../../../mocks/gameData';
import { Game } from '../../../../generated/graphql';

const meta: Meta<typeof SelectDefGame> = {
  title: 'games/SelectDefGame',
  component: SelectDefGame,
  decorators: [styledPreviewDecorator()]
};

const game = gameData[Game.SelectDef];

export const GameDefault = (args: GameProps) => (
  <SelectDefGame {...args} {...game} currentStage={GameStage.Initial} />
);

export const GameSuccess = (args: GameProps) => {
  return <SelectDefGame {...args} {...game} currentStage={GameStage.Success} />;
};

export const GameError = (args: GameProps) => (
  <SelectDefGame {...args} {...game} currentStage={GameStage.Error} />
);

export default meta;
