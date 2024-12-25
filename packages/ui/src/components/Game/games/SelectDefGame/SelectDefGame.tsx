import React, { FormEventHandler, useState } from 'react';
import { cn } from '../../../../utils/classnames';
import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { OptionBox } from '../../../OptionBox/OptionBox';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import styles from '../../Game.module.css';
import { Button } from '../../../Button/Button';
import { checkTextAnswer } from '../helpers';

/**Component to display Select def game*/
export const SelectDefGame = ({
  task,
  question,
  audioUrl,
  className,
  options,
  onSubmit,
  inputRef,
  buttonRef,
  currentStage,
  correctAnswer,
  onNext
}: GameProps) => {
  const [value, setValue] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(!checkTextAnswer(value, correctAnswer));
  };

  const handleNext = () => {
    setValue('');
    onNext();
  };

  const renderButton = () => {
    if (currentStage === GameStage.Initial) {
      return (
        <Button
          data-cy="check-button"
          disabled={!value?.length}
          type="submit"
          variant="secondary"
        >
          Check
        </Button>
      );
    }
    return (
      <Button
        ref={buttonRef}
        autoFocus
        onClick={handleNext}
        data-cy="continue-button"
      >
        Continue
      </Button>
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

  if (!options?.length) {
    return;
  }

  return (
    <form data-cy="gameForm" className={styles.answer} onSubmit={handleSubmit}>
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
              dataCy="gameAnswer"
              ref={inputRef}
              value={value}
              isDisabled={currentStage !== 'initial'}
              variant={currentStage}
              correctOption={correctAnswer[0]}
              incorrectOption={value}
              options={options}
              onChange={setValue}
            />
          </div>
        </article>
      </div>
      {renderButton()}
    </form>
  );
};
