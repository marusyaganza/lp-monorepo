import React from 'react';
import { cn } from '../../../../utils/classnames';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { TextInput } from '../../../TextInput/TextInput';
import styles from '../../Game.module.css';
import { GameProps } from '../../../../types/gameTypes';

/**Component to display Audio game*/
export const AudioGame = ({
  task,
  question,
  className,
  currentResult,
  currentStage,
  onChange,
  value,
  inputRef
}: GameProps) => {
  const renderCorrectAnswer = () => {
    const answeredCorrectly =
      !currentResult?.incorrectAnswer || currentStage === 'initial';
    return (
      <span
        data-cy="correctAnswer"
        className={cn(
          styles.correctAnswer,
          answeredCorrectly ? styles.hidden : ''
        )}
      >
        {!answeredCorrectly && currentResult?.correctAnswer}
      </span>
    );
  };

  return (
    <div className={styles.gameContainer}>
      {renderCorrectAnswer()}
      <article className={cn(styles.container, className)}>
        <p data-cy="gameTask" className={styles.task}>
          {task}
        </p>
        <div className={styles.questionContainer}>
          <AudioButton
            autoplay
            iconHeight={50}
            iconWidth={50}
            src={question[0]}
          />
        </div>
        <div className={styles.answer}>
          <TextInput
            dataCy="gameAnswer"
            ref={inputRef}
            value={value}
            variant={currentStage}
            name="word"
            onChange={onChange}
            isDisabled={currentStage !== 'initial'}
          />
        </div>
      </article>
    </div>
  );
};
