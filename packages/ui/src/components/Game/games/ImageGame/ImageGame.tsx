import React, { FormEventHandler, useEffect, useState } from 'react';
import { cn } from '../../../../utils/classnames';
import { TextInput } from '../../../TextInput/TextInput';
import styles from '../../Game.module.css';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import { Button } from '../../../Button/Button';
import { checkTextAnswer } from '../helpers';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { Spinner } from '../../../Spinner/Spinner';

/**Component to display Image game*/
export const ImageGame = ({
  task,
  question,
  className,
  currentStage,
  onSubmit,
  inputRef,
  buttonRef,
  correctAnswer,
  nextQuestion,
  audioUrl,
  shortDef,
  onNext
}: GameProps) => {
  const [value, setValue] = useState('');
  const [currentImage, setCurrentImage] = useState(question[0]);

  useEffect(() => {
    if (nextQuestion?.[0]) {
      const img = new Image();
      img.src = nextQuestion;
    }
  }, [nextQuestion]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(checkTextAnswer(value, correctAnswer));
  };

  const handleNext = () => {
    setCurrentImage(nextQuestion || '');
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
            <div className={styles.imageContainer}>
              {currentImage ? (
                <img
                  className={styles.imageQuestion}
                  src={currentImage}
                  alt={shortDef || ''}
                />
              ) : (
                <Spinner />
              )}
            </div>
          </div>
          <div className={styles.answer}>
            <TextInput
              value={value}
              dataCy="gameAnswer"
              ref={inputRef}
              variant={currentStage}
              name="word"
              onChange={setValue}
              isDisabled={currentStage !== 'initial' || !currentImage}
            />
          </div>
        </article>
      </div>
      {renderButton()}
    </form>
  );
};
