import React from 'react';
import { GameCard } from './GameCard';
import { games } from '../../mocks/games';
import { routerDecorator } from '../../storybook-decorators';

export default {
  title: 'game/GameCard',
  component: GameCard,
  decorators: [routerDecorator]
};

export const GameCardDefault = () => {
  return (
    <div className="imagesList">
      {games.map(game => (
        <GameCard key={game.name} game={game} linkUrl="#" />
      ))}
    </div>
  );
};
