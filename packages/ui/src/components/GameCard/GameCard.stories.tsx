import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { GameCard } from './GameCard';
import { games } from '../../mocks/games';
import '../../assets/styles/common-styles.css';

export default {
  title: 'GameCard',
  component: GameCard,
  decorators: [withRouter]
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
