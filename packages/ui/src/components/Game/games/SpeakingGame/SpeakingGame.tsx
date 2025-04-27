import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import { cn } from '../../../../utils/classnames';
import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';
import { Icon } from '../../../Icon/icon';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { GameProps, GameStage } from '../../../../types/gameTypes';

import styles from './SpeakingGame.module.css';
import commonStyles from '../../Game.module.css';
import { Button } from '../../../Button/Button';
import { checkTextAnswer } from '../helpers';
import { SpeechInput } from '../../../SpeechInput/SpeechInput';
import { FocusableHTMLElement } from '../../../../types/types';

/**Component to display Speaking game*/
export const SpeakingGame = ({
  task,
  question,
  audioUrl,
  className,
  inputRef,
  onNext,
  buttonRef,
  onSubmit,
  correctAnswer,
  currentStage,
  language
}: GameProps) => {
  const [value, setValue] = useState('');
  const checkButtonRef = useRef<FocusableHTMLElement>(null);

  useEffect(() => {
    if (
      checkButtonRef?.current &&
      currentStage === GameStage.Initial &&
      value
    ) {
      checkButtonRef.current.focus();
    }
  }, [value, currentStage]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(checkTextAnswer(value, correctAnswer));
  };

  const handleNext = () => {
    setValue('');
    onNext();
  };

  const renderButton = () => {
    if (currentStage === GameStage.Initial) {
      return (
        <Button
          ref={checkButtonRef}
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
        <p data-cy="gameQuestion" className={commonStyles.question}>
          {<DictionaryEntity text={question[0]} />}
        </p>
      );
    }
    return (
      <div className={commonStyles.questionContainer}>
        {question.map(entry => {
          return (
            <p
              data-cy="gameQuestion"
              key={entry}
              className={commonStyles.question}
            >
              <Icon
                className={commonStyles.listIcon}
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
    return (
      <p className={styles.answers}>
        <span className={styles.incorrectAnswer}>{value}</span>
        <Icon id="notEqual" width={20} height={20} />
        <span className={commonStyles.correctAnswer} data-cy="correctAnswer">
          {correctAnswer.join(', or ')}
        </span>
      </p>
    );
  };

  const renderAudioButton = () => {
    if (!audioUrl || currentStage === GameStage.Initial) {
      return;
    }
    return (
      <span className={commonStyles.additionalAudio}>
        <AudioButton iconHeight={24} iconWidth={24} src={audioUrl} autoplay />
      </span>
    );
  };

  return (
    <form
      data-cy="gameForm"
      className={commonStyles.answer}
      onSubmit={handleSubmit}
    >
      <div className={commonStyles.gameContainer}>
        <article className={cn(commonStyles.container, className)}>
          <p data-cy="gameTask" className={commonStyles.task}>
            {task} {renderAudioButton()}
          </p>
          {renderQuestion()}
          <div className={commonStyles.answer}>
            <div className={styles.answerContent}>
              <SpeechInput
                language={language}
                dataCy="gameAnswer"
                ref={inputRef}
                variant={currentStage}
                onChange={setValue}
                isDisabled={currentStage !== GameStage.Initial}
              />
              {value && currentStage !== GameStage.Error && (
                <p className={styles.currentValue}>
                  <span className={styles.bold}>You said</span>
                  <span
                    className={
                      currentStage === GameStage.Success
                        ? styles.success
                        : undefined
                    }
                  >
                    {value}
                  </span>
                </p>
              )}
            </div>

            {currentStage === GameStage.Error && renderCorrectAnswer()}
          </div>
        </article>
      </div>
      {renderButton()}
    </form>
  );
};
