import React, { useMemo, useRef, useEffect } from 'react';
import {
  GameQuestionAdditionalInfo,
  Game as GameType,
  Language
} from '../../generated/graphql';
import { Button } from '../Button/Button';
import { DictionaryEntity } from '../DictionaryEntity/DictionaryEntity';
import { Icon } from '../Icon/icon';
import { useModal } from '../Modal/useModal';
import { games } from './games';
import { GameResultType, GameStage, GameState } from '../../types/gameTypes';

import styles from './Game.module.css';
import { FocusableHTMLElement } from '../../types/types';

export interface GameComponentProps {
  task: string;
  question: string[];
  nextQuestion?: string;
  options?: string[] | null;
  type: GameType;
  correctAnswer: string[];
  additionalInfo?: GameQuestionAdditionalInfo | null;
  onSubmit: (value: GameResultType) => void;
  /**additional styling */
  className?: string;
  currentResult?: GameState['currentResult'];
  onNext: () => void;
  language?: Language;
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
  const currentStage = useMemo(
    () => currentResult?.type || GameStage.Initial,
    [currentResult?.type]
  );
  const showAdditionalInfo = useMemo(
    () => currentStage === 'error' || currentStage === 'success',
    [currentStage]
  );
  const buttonRef = useRef<FocusableHTMLElement>(null);
  const inputRef = useRef<FocusableHTMLElement>(null);
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
      <CurrentGame
        onSubmit={onSubmit}
        currentStage={currentStage}
        onNext={onNext}
        inputRef={inputRef}
        buttonRef={buttonRef}
        audioUrl={additionalInfo?.audioUrl}
        {...props}
      />
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
