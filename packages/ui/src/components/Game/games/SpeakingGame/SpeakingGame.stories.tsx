import React from 'react';
import { SpeakingGame } from './SpeakingGame';
import { styledPreviewDecorator } from '../../../../storybook-decorators';
import type { Meta } from '@storybook/react';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { gameData } from '../../../../mocks/gameData';
import { Game } from '../../../../generated/graphql';

const meta: Meta<typeof SpeakingGame> = {
  title: 'games/SpeakingGame',
  component: SpeakingGame,
  decorators: [styledPreviewDecorator()]
};

const game = gameData[Game.TypeWord];

export const GameDefault = (args: GameProps) => (
  <SpeakingGame {...args} {...game} currentStage={GameStage.Initial} />
);

export default meta;
