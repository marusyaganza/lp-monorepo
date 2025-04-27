import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/classnames';

import styles from './GameCard.module.css';

export interface GameCardProps {
  /**Game config: includes game title, description and type */
  game: GameConfigType;
  /**link to game's page */
  linkUrl: string;
  state?: Record<keyof any, unknown>;
  /**additional styling */
  className?: string;
}

import audio from '../../assets/img/gameLogos/audio.svg';
import select_definition from '../../assets/img/gameLogos/select_definition.svg';
import select_word from '../../assets/img/gameLogos/select_word.svg';
import type_word from '../../assets/img/gameLogos/type_word.svg';
import conjugation from '../../assets/img/gameLogos/conjugation.svg';
import gender from '../../assets/img/gameLogos/gender.svg';
import image from '../../assets/img/gameLogos/image.svg';
import speaking from '../../assets/img/gameLogos/speaking.svg';

import { Game } from '../../generated/graphql';
import { GameConfigType } from '../../types/types';
const images = {
  [Game.SelectDef]: select_definition,
  [Game.Audio]: audio,
  [Game.SelectWord]: select_word,
  [Game.TypeWord]: type_word,
  [Game.Image]: image,
  [Game.Conjugation]: conjugation,
  [Game.Gender]: gender,
  [Game.Speaking]: speaking
};
/**Game card that displays game's main info */
export const GameCard = ({
  game,
  linkUrl,
  state,
  className
}: GameCardProps) => {
  const { name, type, desc } = game;
  return (
    <div data-cy="gameCard" className={styles.gameContainer}>
      <Link to={linkUrl} state={state} className={cn(className, styles.link)}>
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={images[type]} alt={desc} />
          </div>
          <h2 className={styles.gameTitleMobile}>{name}</h2>
          <p data-cy="game-desc" className={styles.description}>
            {desc}
          </p>
        </div>
      </Link>
      <h2 className={styles.gameTitle}>{name}</h2>
    </div>
  );
};
