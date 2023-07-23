import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/classnames';

import styles from './GameCard.module.css';
import { GameConfig } from '../../generated/graphql';

export interface GameCardProps {
  /**GameCard prop */
  game: GameConfig;
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
import find_defs from '../../mocks/mockGamesLogos/find_defs.svg';
import flash_cards from '../../mocks/mockGamesLogos/flash_cards.svg';
const images = {
  select_definition,
  audio,
  select_word,
  type_word,
  find_defs,
  flash_cards
};
/**Component description goes here */
export const GameCard = ({ game, linkUrl, className }: GameCardProps) => {
  const { name, imgUrl, desc } = game;
  return (
    <Link to={linkUrl} className={cn(className, styles.link)}>
      <div className={styles.gameContainer}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            {/* @ts-ignore */}
            <img className={styles.image} src={images[imgUrl]} alt={desc} />
          </div>
          <p className={styles.description}>{desc}</p>
        </div>
        <h2 className={styles.gameTitle}>{name}</h2>
      </div>
    </Link>
  );
};
