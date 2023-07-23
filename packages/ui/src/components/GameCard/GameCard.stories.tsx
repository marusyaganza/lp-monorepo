import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { GameCard, GameCardProps } from './GameCard';
import { games } from '../../mocks/games';
import '../../assets/styles/common-styles.css';

export default {
  title: 'GameCard',
  component: GameCard,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  },
  decorators: [withRouter]
};

export const GameCardDefault = () => {
  return (
    <>
      {games.map(game => (
        <div key={game.name} className="presentationBox">
          <GameCard game={game} linkUrl="kdflsdlf" />
        </div>
      ))}
    </>
  );
};
