import React from 'react';
import { cn } from '../../utils/classnames';
import successImg from '../../assets/img/game-result-success.svg';
import errorImg from '../../assets/img/game-result-error.svg';
import initialImg from '../../assets/img/game-result-initial.svg';
import inProgressImg from '../../assets/img/game-result-in-progress.svg';
import styles from './GameFooter.module.css';

export interface GameFooterProps {
  variant?: 'initial' | 'success' | 'error' | 'inProgress';
  /**additional styling */
  className?: string;
}

const images = {
  success: successImg,
  error: errorImg,
  initial: initialImg,
  inProgress: inProgressImg
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
  initial: ["Let's get started"],
  inProgress: [
    'Embark on a wordy adventure and boost your vocabulary!',
    'Unlock the magic of words in a thrilling word game.',
    'Sharpen your language skills - dive into our word game!',
    'Expand your horizons, one word at a time!',
    'Words are your playground. Play and learn!',
    'Challenge yourself in a fun word game today.',
    'Discover joy in words, exercise your brain.',
    'Words hold the keys to knowledge. Join the game!',
    'Engage your mind with a fun word game.',
    'Play with words, ignite your passion for language!'
  ]
};

/**Game footer - displays current game results */
export const GameFooter = ({ variant, className }: GameFooterProps) => {
  console.log('variant', variant);
  const getMessage = () => {
    if (!variant) {
      return '';
    }
    const texts = messages[variant];
    const index = Math.floor(Math.random() * texts.length);
    return texts[index];
  };
  const renderContent = () => {
    return (
      <section className={styles.resultContainer}>
        {variant && (
          <img className={styles.image} src={images[variant]} alt={variant} />
        )}
        {variant && (
          <p data-cy="gameFooterMessage" className={styles.message}>
            {getMessage()}
          </p>
        )}
      </section>
    );
  };
  return (
    <footer data-cy="gameFooter" className={cn(className, styles.container)}>
      {renderContent()}
    </footer>
  );
};
