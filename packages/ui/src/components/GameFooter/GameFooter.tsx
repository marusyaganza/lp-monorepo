import React, { useMemo } from 'react';
import { cn } from '../../utils/classnames';
import successImg from '../../assets/img/game-result-success.svg';
import errorImg from '../../assets/img/game-result-error.svg';
import initialImgfrom from '../../assets/img/game-result-initial.svg';
import styles from './GameFooter.module.css';

export interface GameFooterProps {
  variant?: 'initial' | 'success' | 'error';
  /**additional styling */
  className?: string;
}

const images = {
  success: successImg,
  error: errorImg,
  initial: initialImgfrom
};

const messages = {
  success: [
    'Great job! Language skills shining!',
    'Impressive work! Mastering language!',
    "You've got it! Keep learning!",
    'Well done! Proficiency rising!',
    'Fantastic effort! Flourishing skills!',
    'Keep it up! Language virtuoso!',
    'Incredible job! Remarkable grasp!',
    'Nailed it! Inspiring progress!',
    'Outstanding! Unmatched aptitude!',
    'Acing it! Commendable dedication!'
  ],
  error: [
    "Keep going, you're making progress!",
    "Mistakes are stepping stones to success. Don't give up!",
    "You've got this! Keep practicing!",
    'Learning is a journey. Keep pushing forward!',
    'Embrace challenges to learn and grow!',
    "Believe in yourself! You'll master it.",
    "Keep at it, and you'll see results!",
    "You're getting there! Keep practicing!",
    'Progress comes from perseverance!',
    "Stay positive! You've got this!"
  ],
  initial: ["Let's get started"]
};

/**Game footer - displays current game results */
export const GameFooter = ({ variant, className }: GameFooterProps) => {
  const message = useMemo(() => {
    if (!variant) {
      return '';
    }
    const texts = messages[variant];
    const index = Math.floor(Math.random() * texts.length);
    return texts[index];
  }, [variant]);
  const renderContent = () => {
    return (
      <section className={styles.resultContainer}>
        {variant && (
          <img className={styles.image} src={images[variant]} alt={variant} />
        )}
        {variant && <p className={styles.message}>{message}</p>}
      </section>
    );
  };
  return (
    <footer className={cn(className, styles.container)}>
      {renderContent()}
    </footer>
  );
};
