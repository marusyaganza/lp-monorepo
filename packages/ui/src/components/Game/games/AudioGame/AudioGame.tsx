import React, { FormEventHandler, useState } from 'react';
import { cn } from '../../../../utils/classnames';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { TextInput } from '../../../TextInput/TextInput';
import styles from '../../Game.module.css';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { Button } from '../../../Button/Button';
import { checkTextAnswer } from '../helpers';

/**Component to display Audio game*/
export const AudioGame = ({
  task,
  question,
  className,
  currentStage,
  onSubmit,
  inputRef,
  buttonRef,
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

  const renderCorrectAnswer = () => {
    const answeredCorrectly = currentStage !== GameStage.Error;
    return (
      <span
        data-cy="correctAnswer"
        className={cn(
          styles.correctAnswer,
          answeredCorrectly ? styles.hidden : ''
        )}
      >
        {!answeredCorrectly && correctAnswer.join(', or ')}
      </span>
    );
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

  return (
    <form data-cy="gameForm" className={styles.answer} onSubmit={handleSubmit}>
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
              value={value}
              dataCy="gameAnswer"
              ref={inputRef}
              variant={currentStage}
              name="word"
              onChange={setValue}
              isDisabled={currentStage !== 'initial'}
            />
          </div>
        </article>
      </div>
      {renderButton()}
    </form>
  );
};
