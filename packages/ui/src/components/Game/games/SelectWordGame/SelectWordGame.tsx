import React from 'react';
import { cn } from '../../../../utils/classnames';
import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { OptionBox } from '../../../OptionBox/OptionBox';
import { Icon } from '../../../Icon/icon';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import styles from '../../Game.module.css';

/**Component to display Select word game*/
export const SelectWordGame = ({
  task,
  question,
  audioUrl,
  className,
  currentResult,
  options,
  onChange,
  value,
  inputRef,
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

  if (!options?.length) {
    return;
  }

  return (
    <div className={styles.gameContainer}>
      <article className={cn(styles.container, className)}>
        <p data-cy="gameTask" className={styles.task}>
          {task} {renderAudioButton()}
        </p>
        {renderQuestion()}
        <div className={styles.answer}>
          <OptionBox
            dataCy="gameAnswer"
            ref={inputRef}
            value={value}
            isDisabled={currentStage !== 'initial'}
            variant={currentStage}
            correctOption={currentResult?.correctAnswer}
            incorrectOption={currentResult?.incorrectAnswer}
            options={options}
            onChange={onChange}
          />
        </div>
      </article>
    </div>
  );
};
