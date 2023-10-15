import React from 'react';
import { cn } from '../../utils/classnames';
import resultHigh from '../../assets/img/result-high.svg';
import resulMedium from '../../assets/img/result-medium.svg';
import resultLow from '../../assets/img/result-low.svg';

import styles from './GameResult.module.css';
import { Button } from '../Button/Button';

export interface GameResultProps {
  /**number of words learned */
  wordCount: number;
  /**number of errors made */
  erroCount: number;
  /**additional styling */
  buttonClickHandler: () => void;
  className?: string;
}
/**Component that displays game's result */
export const GameResult = ({
  wordCount,
  erroCount,
  className,
  buttonClickHandler
}: GameResultProps) => {
  const result = Math.floor(((wordCount - erroCount) * 100) / wordCount);
  const renderImage = () => {
    let image = resulMedium;
    if (result > 60) {
      image = resultHigh;
    }
    if (result < 30) {
      image = resultLow;
    }
    return <img src={image} alt="" height={200} />;
  };

  return (
    <div data-cy="gameResult" className={cn(className, styles.container)}>
      <h1 className={styles.heading}>Training complete</h1>
      <article className={styles.resultContainer}>
        {renderImage()}
        <div className={styles.result}>
          <p>
            Your result:{' '}
            <span className={styles.resultNumber}>{`${result}%`}</span>
          </p>
          <p>
            Learned words:{' '}
            <span className={styles.resultNumber}>{wordCount}</span>
          </p>
          <p>
            Answered correctly:{' '}
            <span className={styles.resultNumber}>{wordCount - erroCount}</span>
          </p>
        </div>
      </article>
      <Button autoFocus variant="success" onClick={buttonClickHandler}>
        Finish
      </Button>
    </div>
  );
};
