import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/classnames';

import styles from './GameCard.module.css';
import { GameConfig } from '../../generated/graphql';

export interface GameCardProps {
  /**GameCard prop */
  game: Omit<GameConfig, 'wordsPerGame' | 'optionsPerGame' | 'minWords'>;
  /**additional styling */
  linkUrl: string;
  className?: string;
}

/**Temporary mock
 * remove this once the server returns correct imageUrls
 */
import audio from '../../mocks/mockGamesLogos/audio.svg';
import select_definition from '../../mocks/mockGamesLogos/select_definition.svg';
import select_word from '../../mocks/mockGamesLogos/select_word.svg';
import type_word from '../../mocks/mockGamesLogos/type_word.svg';
// import find_defs from '../../mocks/mockGamesLogos/find_defs.svg';
// import flash_cards from '../../mocks/mockGamesLogos/flash_cards.svg';
import { Game } from '../../generated/graphql';
const images = {
  [Game.SelectDef]: select_definition,
  [Game.Audio]: audio,
  [Game.SelectWord]: select_word,
  [Game.TypeWord]: type_word
  // find_defs,
  // flash_cards
};
/**Game card that displays game's main info */
export const GameCard = ({ game, linkUrl, className }: GameCardProps) => {
  const { name, type, desc } = game;
  return (
    <Link to={linkUrl} className={cn(className, styles.link)}>
      <div className={styles.gameContainer}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={images[type]} alt={desc} />
          </div>
          <p className={styles.description}>{desc}</p>
        </div>
        <h2 className={styles.gameTitle}>{name}</h2>
      </div>
    </Link>
  );
};
