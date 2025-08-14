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
  <div className="page">
    <SelectWordGame {...args} {...game} currentStage={GameStage.Initial} />
  </div>
);

export default meta;
