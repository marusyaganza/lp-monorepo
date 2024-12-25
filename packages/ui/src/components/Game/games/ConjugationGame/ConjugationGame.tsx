import React, { FormEventHandler, useState } from 'react';
import { cn } from '../../../../utils/classnames';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { ConjugationInput } from '../../../ConjugationInput/ConjugationInput';
import { GameProps, GameStage } from '../../../../types/gameTypes';

import styles from '../../Game.module.css';
import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';
import { Button } from '../../../Button/Button';
import { checkMultipleAnswers } from '../helpers';

/**Component to display Conjugation game*/
export const ConjugationGame = ({
  task,
  onSubmit,
  buttonRef,
  onNext,
  audioUrl,
  className,
  currentStage,
  inputRef,
  question,
  correctAnswer
}: GameProps) => {
  const [values, setValues] = useState<string[]>(() => {
    return correctAnswer.map(answ => (answ === '-' ? answ : ''));
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(!checkMultipleAnswers(values, correctAnswer));
  };

  const handleNext = () => {
    const initialValues = correctAnswer.map(answ => (answ === '-' ? answ : ''));
    setValues(initialValues);
    onNext();
  };

  const renderButton = () => {
    const isDisabled = values.every(val => !val || val === '-');
    if (currentStage === GameStage.Initial) {
      return (
        <Button
          data-cy="check-button"
          disabled={isDisabled}
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

  const renderCorrectAnswer = () => {
    const hasError = currentStage === GameStage.Error;
    return (
      <span
        data-cy="correctAnswer"
        className={cn(styles.correctAnswer, hasError ? '' : styles.hidden)}
      >
        {hasError && correctAnswer.join(', ')}
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
    <form data-cy="gameForm" className={styles.answer} onSubmit={handleSubmit}>
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
              variant={currentStage}
              values={values}
              correctAnswer={correctAnswer}
              onChange={setValues}
              isDisabled={currentStage !== GameStage.Initial}
            />
          </div>
        </article>
      </div>
      {renderButton()}
    </form>
  );
};
