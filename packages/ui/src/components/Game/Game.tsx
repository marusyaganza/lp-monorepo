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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      return <p className={styles.question}>{question[0]}</p>;
    }
    return (
      <div className={styles.questionContainer}>
        {question.map(entry => {
          return (
            <p key={entry} className={styles.question}>
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
        className={cn(
          styles.correctAnswer,
          answeredCorrectly ? styles.hidden : ''
        )}
      >
        {!answeredCorrectly && currentResult?.correctAnswer}
      </span>
    );
  };

  return (
    <div className={styles.gameContainer}>
      {!options?.length && renderCorrectAnswer()}
      <article className={cn(styles.container, className)}>
        <p className={styles.task}>
          {task} {renderAudioButton()}
        </p>
        {renderQuestion()}
        <form className={styles.answer} onSubmit={handleSubmit}>
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
    </div>
  );
};
