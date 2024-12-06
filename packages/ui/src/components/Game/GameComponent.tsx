import React, {
  FormEventHandler,
  useState,
  useMemo,
  useRef,
  useEffect
} from 'react';
import {
  GameQuestionAdditionalInfo,
  Game as GameType,
  Tense
} from '../../generated/graphql';
import { Button } from '../Button/Button';
import { DictionaryEntity } from '../DictionaryEntity/DictionaryEntity';
import { Icon } from '../Icon/icon';
import { useModal } from '../Modal/useModal';
import { games } from './games';
import { GameStage } from '../../types/gameTypes';

import styles from './Game.module.css';

export interface GameComponentProps {
  task: string;
  question: string[];
  options?: string[] | null;
  type: GameType;
  tense?: Tense | null;
  correctAnswer?: string;
  additionalInfo?: GameQuestionAdditionalInfo | null;
  onSubmit: (value: string) => void;
  /**additional styling */
  className?: string;
  currentResult?: {
    type?: GameStage;
    correctAnswer?: string;
    incorrectAnswer?: string;
  };
  onNext: () => void;
}
/**Component to display game*/
export const GameComponent = ({
  type,
  currentResult,
  additionalInfo,
  onSubmit,
  onNext,
  ...props
}: GameComponentProps) => {
  const [value, setValue] = useState('');
  const currentStage = useMemo(
    () => currentResult?.type || GameStage.Initial,
    [currentResult?.type]
  );
  const showAdditionalInfo = useMemo(
    () => currentStage === 'error' || currentStage === 'success',
    [currentStage]
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { Modal, openModal } = useModal();

  useEffect(() => {
    // if the component displays the current game result, 'next' button is focused
    if (buttonRef?.current && currentStage !== GameStage.Initial) {
      buttonRef.current.focus();
    }
    // The input field should be focused so the user could type the answer
    if (inputRef?.current && currentStage === GameStage.Initial) {
      inputRef.current.focus();
    }
  }, [currentStage]);

  const handleChange = (val: string) => {
    setValue(val);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(value.trim());
  };

  // Clean the state once the question is answered
  const handleNext = () => {
    setValue('');
    onNext();
  };

  const renderButton = () => {
    if (currentStage === GameStage.Initial) {
      return (
        <Button
          data-cy="check-button"
          disabled={!value}
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

  const renderExamples = () => {
    const examples = additionalInfo?.examples;
    if (!examples?.length || !showAdditionalInfo) {
      return;
    }
    return (
      <>
        <h3 className={styles.examplesHeading}>Examples</h3>
        <ul>
          {examples.map(example => {
            const text = example?.text;
            const translation = example?.translation
              ? ` (${example.translation})`
              : '';
            return (
              <li key={text} className={styles.example}>
                <Icon
                  className={styles.listIconBook}
                  width={20}
                  height={20}
                  id="book"
                />
                <DictionaryEntity
                  className={styles.examplesText}
                  text={`${text}${translation}`}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  const renderAdditionalInfo = () => {
    if (!showAdditionalInfo) {
      return;
    }

    const showButton = !!(
      additionalInfo?.imgUrl || additionalInfo?.examples?.length
    );
    return (
      <section data-cy="additionalInfo" className={styles.additionalInfo}>
        {additionalInfo?.imgUrl && (
          <img
            className={styles.wordImage}
            src={additionalInfo?.imgUrl}
            alt=""
          />
        )}
        {additionalInfo?.shortDef && (
          <DictionaryEntity
            className={styles.examplesText}
            text={additionalInfo?.shortDef}
          />
        )}
        {showButton && (
          <Button
            onClick={openModal}
            variant="tertiary"
            className={styles.additionalInfoBtn}
          >
            Show additional info
          </Button>
        )}
      </section>
    );
  };

  const CurrentGame = games[type];

  return (
    <div className={styles.gameContainer}>
      {renderAdditionalInfo()}
      <form
        data-cy="gameForm"
        className={styles.answer}
        onSubmit={handleSubmit}
      >
        <CurrentGame
          onChange={handleChange}
          currentStage={currentStage}
          currentResult={currentResult}
          inputRef={inputRef}
          value={value}
          audioUrl={additionalInfo?.audioUrl}
          {...props}
        />
        {renderButton()}
      </form>
      <section data-cy="examples" className={styles.examplesContainer}>
        {renderExamples()}
      </section>
      <Modal className={styles.modal}>
        <div className={styles.modalContent}>
          {additionalInfo?.imgUrl && (
            <img
              className={styles.modalWordImg}
              src={additionalInfo?.imgUrl}
              alt=""
            />
          )}
          {renderExamples()}
        </div>
      </Modal>
    </div>
  );
};
