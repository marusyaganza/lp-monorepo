import React, {
  FormEventHandler,
  useState,
  useMemo,
  useRef,
  useEffect
} from 'react';
import { cn } from '../../utils/classnames';
import {
  GameQuestionAdditionalInfo,
  Game as GameType
} from '../../generated/graphql';
import { AudioButton } from '../AudioButton/AudioButton';
import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import styles from './Game.module.css';
import { OptionBox } from '../OptionBox/OptionBox';
import { DictionaryEntity } from '../DictionaryEntity/DictionaryEntity';
import { Icon } from '../Icon/icon';
import { useModal } from '../Modal/useModal';

export interface GameProps {
  task: string;
  question: string[];
  options?: string[];
  type: GameType;
  additionalInfo?: GameQuestionAdditionalInfo | null;
  onSubmit: (value: string) => void;
  /**additional styling */
  className?: string;
  currentResult?: {
    type?: 'initial' | 'success' | 'error';
    correctAnswer?: string;
    incorrectAnswer?: string;
  };
  onNext: () => void;
}
/**Component to display game*/
export const Game = ({
  task,
  question,
  options,
  className,
  type,
  onSubmit,
  currentResult,
  additionalInfo,
  onNext
}: GameProps) => {
  const [value, setValue] = useState('');
  const currentStage = useMemo(
    () => currentResult?.type || 'initial',
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
    if (buttonRef?.current && currentStage !== 'initial') {
      buttonRef.current.focus();
    }
    // The input field should be focused so the user could type the answer
    if (inputRef?.current && currentStage === 'initial') {
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
  const renderQuestion = () => {
    if (type === GameType.Audio) {
      return (
        <div className={styles.questionContainer}>
          <AudioButton
            autoplay
            iconHeight={50}
            iconWidth={50}
            src={question[0]}
          />
        </div>
      );
    }
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
    const hasAudioButton =
      additionalInfo?.audioUrl &&
      (type === GameType.SelectDef ||
        (currentStage !== 'initial' && type !== GameType.Audio));
    return (
      hasAudioButton && (
        <AudioButton
          iconHeight={24}
          iconWidth={24}
          className={styles.additionalAudio}
          src={additionalInfo?.audioUrl || ''}
          autoplay
        />
      )
    );
  };

  const renderInput = () => {
    if (type === GameType.Audio || type === GameType.TypeWord) {
      return (
        <TextInput
          dataCy="gameAnswer"
          ref={inputRef}
          value={value}
          variant={currentStage}
          name="word"
          onChange={handleChange}
          isDisabled={currentStage !== 'initial'}
        />
      );
    }
    if (options?.length) {
      return (
        <OptionBox
          ref={inputRef}
          value={value}
          isDisabled={currentStage !== 'initial'}
          variant={currentStage}
          correctOption={currentResult?.correctAnswer}
          incorrectOption={currentResult?.incorrectAnswer}
          options={options}
          onChange={handleChange}
        />
      );
    }
    return <p>Game is not found</p>;
  };

  const renderCorrectAnswer = () => {
    const answeredCorrectly =
      !currentResult?.incorrectAnswer || currentStage === 'initial';
    return (
      <span
        data-cy="correctAnswer"
        className={cn(
          styles.correctAnswer,
          answeredCorrectly ? styles.hidden : ''
        )}
      >
        {!answeredCorrectly && currentResult?.correctAnswer}
      </span>
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

  return (
    <div className={styles.gameContainer}>
      {renderAdditionalInfo()}
      {!options?.length && renderCorrectAnswer()}
      <article className={cn(styles.container, className)}>
        <p data-cy="gameTask" className={styles.task}>
          {task} {renderAudioButton()}
        </p>
        {renderQuestion()}
        <form
          data-cy="gameForm"
          className={styles.answer}
          onSubmit={handleSubmit}
        >
          {renderInput()}
          {currentStage === 'initial' ? (
            <Button disabled={!value} type="submit" variant="secondary">
              Check
            </Button>
          ) : (
            <Button ref={buttonRef} autoFocus onClick={handleNext}>
              Continue
            </Button>
          )}
        </form>
      </article>
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
