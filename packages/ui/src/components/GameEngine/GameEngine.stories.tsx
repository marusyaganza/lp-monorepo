import React from 'react';
import { GameEngine, GameEngineProps } from './GameEngine';
import type { Meta } from '@storybook/react';
import { gameEngineData } from '../../mocks/gameData';
import { Game } from '../../generated/graphql';

const meta: Meta<typeof GameEngine> = {
  title: 'game/GameEngine',
  component: GameEngine
};

export const Audio = (args: GameEngineProps) => {
  return <GameEngine {...args} gameData={gameEngineData[Game.Audio]} />;
};

export const SelectDef = (args: GameEngineProps) => {
  return <GameEngine {...args} gameData={gameEngineData[Game.SelectDef]} />;
};

export const SelectWord = (args: GameEngineProps) => {
  return <GameEngine {...args} gameData={gameEngineData[Game.SelectWord]} />;
};

export const TypeWord = (args: GameEngineProps) => {
  return <GameEngine {...args} gameData={gameEngineData[Game.TypeWord]} />;
};

export const Conjugation = (args: GameEngineProps) => {
  return <GameEngine {...args} gameData={gameEngineData[Game.Conjugation]} />;
};

export const Gender = (args: GameEngineProps) => {
  return <GameEngine {...args} gameData={gameEngineData[Game.Gender]} />;
};

export const Image = (args: GameEngineProps) => {
  return <GameEngine {...args} gameData={gameEngineData[Game.Image]} />;
};

export const Speaking = (args: GameEngineProps) => {
  return <GameEngine {...args} gameData={gameEngineData[Game.Speaking]} />;
};

export default meta;
