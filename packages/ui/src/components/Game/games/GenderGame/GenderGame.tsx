import { DictionaryEntity } from '../../../DictionaryEntity/DictionaryEntity';
import { AudioButton } from '../../../AudioButton/AudioButton';
import { GameProps, GameStage } from '../../../../types/gameTypes';
import commoStyles from '../../Game.module.css';
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { cn } from '../../../../utils/classnames';

import styles from './GenderGame.module.css';
import masculineIcon from '../../../../assets/icons/masculine.svg';
import feminineIcon from '../../../../assets/icons/feminine.svg';
import { Button } from '../../../Button/Button';
import { checkMultipleAnswers } from '../helpers';

enum GENDERS {
  FEMININE = 'feminine',
  MASCULINE = 'masculine'
}

const icons = {
  [GENDERS.FEMININE]: feminineIcon,
  [GENDERS.MASCULINE]: masculineIcon
};

/**Component to display Select def game*/
export const GenderGame = ({
  task,
  question,
  audioUrl,
  className,
  correctAnswer,
  onSubmit,
  buttonRef,
  onNext,
  currentStage
}: GameProps) => {
  const [values, setValues] = useState<string[]>([]);
  const isCompleted = currentStage !== GameStage.Initial;

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value, checked } = e.target;
    let newValues = [...values];
    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter(val => val !== value);
    }
    setValues(newValues);
  };

  const handleNext = () => {
    setValues([]);
    onNext();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(!checkMultipleAnswers(values.sort(), correctAnswer));
  };

  const getStyle = (gender: GENDERS) => {
    if (!isCompleted || !correctAnswer?.length) {
      return;
    }
    if (correctAnswer.includes(gender)) {
      return styles.correct;
    }

    if (values.includes(gender)) {
      return styles.incorrect;
    }
    return styles.disabled;
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

  const renderButton = () => {
    if (currentStage === GameStage.Initial) {
      return (
        <Button
          data-cy="check-button"
          disabled={!values?.length}
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
    <form
      data-cy="gameForm"
      className={commoStyles.answer}
      onSubmit={handleSubmit}
    >
      <div className={commoStyles.gameContainer}>
        <article className={cn(commoStyles.container, className)}>
          <p data-cy="gameTask" className={commoStyles.task}>
            {task} {renderAudioButton()}
          </p>
          <p data-cy="gameQuestion" className={commoStyles.question}>
            {<DictionaryEntity text={question[0]} />}
          </p>
          <div className={commoStyles.answer}>
            <div className={cn(className, styles.container)}>
              {Object.values(GENDERS).map(gender => {
                return (
                  <label key={gender} className={styles.label}>
                    <input
                      checked={values.includes(gender)}
                      disabled={currentStage !== GameStage.Initial}
                      className={styles.hidden}
                      onChange={handleChange}
                      value={gender}
                      name="gender"
                      type="checkbox"
                    />
                    <div
                      className={cn(
                        styles.inputContent,
                        styles[gender],
                        getStyle(gender)
                      )}
                    >
                      <img src={icons[gender]} alt="" />
                      {gender}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </article>
      </div>
      {renderButton()}
    </form>
  );
};
