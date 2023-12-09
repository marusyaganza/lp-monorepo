import React from 'react';
import { GameResult, GameResultProps } from './GameResult';

export default {
  title: 'GameResult',
  component: GameResult
};

export const GameResultLow = (args: GameResultProps) => {
  return <GameResult {...args} wordCount={6} erroCount={5} />;
};

export const GameResultMedium = (args: GameResultProps) => {
  return <GameResult {...args} wordCount={6} erroCount={3} />;
};

export const GameResultHigh = (args: GameResultProps) => {
  return <GameResult {...args} wordCount={6} erroCount={0} />;
};
