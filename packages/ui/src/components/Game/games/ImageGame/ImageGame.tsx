import React, { FormEventHandler, useState } from 'react';
import { cn } from '../../../../utils/classnames';
import { TextInput } from '../../../TextInput/TextInput';
import styles from '../../Game.module.css';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { Button } from '../../../Button/Button';
import { checkTextAnswer } from '../helpers';
import { AudioButton } from '../../../AudioButton/AudioButton';

/**Component to display Audio game*/
export const ImageGame = ({
  task,
  question,
  className,
  currentStage,
  onSubmit,
  inputRef,
  buttonRef,
  correctAnswer,
  audioUrl,
  onNext
}: GameProps) => {
  const [value, setValue] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(checkTextAnswer(value, correctAnswer));
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
    <form data-cy="gameForm" className={styles.answer} onSubmit={handleSubmit}>
      <div className={styles.gameContainer}>
        {renderCorrectAnswer()}
        <article className={cn(styles.container, className)}>
          <p data-cy="gameTask" className={styles.task}>
            {task} {renderAudioButton()}
          </p>
          <div className={styles.questionContainer}>
            <img
              loading="lazy"
              className={styles.imageQuestion}
              src={question[0]}
              alt=""
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
