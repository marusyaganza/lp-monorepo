import React, { FormEventHandler, useState } from 'react';
import { cn } from '../../../../utils/classnames';
import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { OptionBox } from '../../../OptionBox/OptionBox';
import { Icon } from '../../../Icon/icon';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import styles from '../../Game.module.css';
import { Button } from '../../../Button/Button';
import { checkTextAnswer } from '../helpers';

/**Component to display Select word game*/
export const SelectWordGame = ({
  task,
  question,
  audioUrl,
  className,
  options,
  onSubmit,
  buttonRef,
  onNext,
  inputRef,
  correctAnswer,
  currentStage
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
    <form data-cy="gameForm" className={styles.answer} onSubmit={handleSubmit}>
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
