import React from 'react';
import { cn } from '../../../../utils/classnames';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { ConjugationInput } from '../../../ConjugationInput/ConjugationInput';
import { GameProps, GameStage } from '../../../../types/gameTypes';

import styles from '../../Game.module.css';
import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';

/**Component to display Conjugation game*/
export const ConjugationGame = ({
  task,
  onChange,
  tense,
  audioUrl,
  className,
  currentResult,
  currentStage,
  inputRef,
  question,
  correctAnswer
}: GameProps) => {
  const renderCorrectAnswer = () => {
    const answeredCorrectly =
      !currentResult?.incorrectAnswer || currentStage === GameStage.Initial;
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

  const renderAudioButton = () => {
    if (!audioUrl) {
      return;
    }
    return (
      <span className={styles.additionalAudio}>
        <AudioButton iconHeight={24} iconWidth={24} src={audioUrl} autoplay />
      </span>
    );
  };

  return (
    <div className={styles.gameContainer}>
      {renderCorrectAnswer()}
      <article className={cn(styles.container, className)}>
        <p data-cy="gameTask" className={styles.task}>
          {task} {renderAudioButton()}
        </p>
        <p data-cy="gameQuestion" className={styles.question}>
          {<DictionaryEntity text={question[0]} />}
        </p>
        <div className={styles.answer}>
          <ConjugationInput
            dataCy="gameAnswer"
            ref={inputRef}
            tense={tense}
            initialValue={correctAnswer}
            variant={currentStage}
            correctAnswer={correctAnswer}
            onChange={onChange}
            isDisabled={currentStage !== GameStage.Initial}
          />
        </div>
      </article>
    </div>
  );
};
