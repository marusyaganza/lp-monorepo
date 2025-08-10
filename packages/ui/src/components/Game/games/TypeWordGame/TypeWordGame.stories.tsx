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
  <div className="page" style={{ width: '150%' }}>
    <TypeWordGame {...args} {...game} currentStage={GameStage.Initial} />
  </div>
);

export default meta;
