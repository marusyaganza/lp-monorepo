import React from 'react';
import { cn } from '../../../../utils/classnames';
import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { OptionBox } from '../../../OptionBox/OptionBox';
import { GameProps } from '../../../../types/gameTypes';
import styles from '../../Game.module.css';

/**Component to display Select def game*/
export const SelectDefGame = ({
  task,
  question,
  audioUrl,
  className,
  currentResult,
  options,
  onChange,
  inputRef,
  value,
  currentStage
}: GameProps) => {
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

  if (!options?.length) {
    return;
  }

  return (
    <div className={styles.gameContainer}>
      <article className={cn(styles.container, className)}>
        <p data-cy="gameTask" className={styles.task}>
          {task} {renderAudioButton()}
        </p>
        <p data-cy="gameQuestion" className={styles.question}>
          {<DictionaryEntity text={question[0]} />}
        </p>
        <div className={styles.answer}>
          <OptionBox
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
