import React from 'react';
import { GameCard } from './GameCard';
import { games } from '../../mocks/games';
import { routerDecorator } from '../../storybook-decorators';

export default {
  title: 'GameCard',
  component: GameCard,
  decorators: [routerDecorator]
};

export const GameCardDefault = () => {
  return (
    <>
      {games.map(game => (
        <div key={game.name} className="presentationBox">
          <GameCard game={game} linkUrl="#" />
        </div>
      ))}
    </>
  );
};
