import React from 'react';
import { cn } from '../../../../utils/classnames';
import { TextInput } from '../../../TextInput/TextInput';
import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';
import { Icon } from '../../../Icon/icon';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { GameProps, GameStage } from '../../../../types/gameTypes';

import styles from '../../Game.module.css';

/**Component to display Type Word game*/
export const TypeWordGame = ({
  task,
  question,
  audioUrl,
  className,
  inputRef,
  value,
  onChange,
  currentResult,
  currentStage
}: GameProps) => {
  const renderQuestion = () => {
    if (question.length === 1) {
      return (
        <p data-cy="gameQuestion" className={styles.question}>
          {<DictionaryEntity text={question[0]} />}
        </p>
      );
    }
    return (
      <div className={styles.questionContainer}>
        {question.map(entry => {
          return (
            <p data-cy="gameQuestion" key={entry} className={styles.question}>
              <Icon
                className={styles.listIcon}
                width={20}
                height={20}
                id="comet"
              />
              <DictionaryEntity text={entry} />
            </p>
          );
        })}
      </div>
    );
  };

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
    if (!audioUrl || currentStage === GameStage.Initial) {
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
        {renderQuestion()}
        <div className={styles.answer}>
          <TextInput
            dataCy="gameAnswer"
            ref={inputRef}
            value={value}
            variant={currentStage}
            name="word"
            onChange={onChange}
            isDisabled={currentStage !== GameStage.Initial}
          />
        </div>
      </article>
    </div>
  );
};
