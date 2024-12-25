import { RefObject } from 'react';
import { GameQuestion, UpdateStatisticsInput } from '../generated/graphql';

export interface GameState {
  currentIndex: number;
  isCompleted: boolean;
  currentResult: {
    type?: GameStage;
  };
  resultData: UpdateStatisticsInput[];
  result: {
    errorCount: number;
  };
  questions: GameQuestion[];
  currentQuestion?: GameQuestion;
  progress: number;
}

export interface GameProps {
  task: string;
  audioUrl?: string | null;
  options?: string[] | null;
  question: string[];
  onSubmit: (value: boolean) => void;
  inputRef: RefObject<HTMLInputElement>;
  className?: string;
  onNext: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
  currentStage: GameStage;
  correctAnswer: string[];
}

export enum GameStage {
  Initial = 'initial',
  Success = 'success',
  Error = 'error'
}
