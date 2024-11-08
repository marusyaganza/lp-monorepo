import { RefObject } from 'react';
import {
  GameQuestion,
  Tense,
  UpdateStatisticsInput
} from '../generated/graphql';

export interface GameProps {
  task: string;
  audioUrl?: string | null;
  options?: string[] | null;
  question: string[];
  tense?: Tense | null;
  onChange: (value: string) => void;
  inputRef: RefObject<HTMLInputElement>;
  className?: string;
  value: string;
  currentStage: GameStage;
  correctAnswer?: string;
  currentResult?: {
    type?: 'initial' | 'success' | 'error';
    correctAnswer?: string;
    incorrectAnswer?: string;
  };
}

export enum GameStage {
  Initial = 'initial',
  Success = 'success',
  Error = 'error'
}

export interface GameState {
  currentIndex: number;
  isCompleted: boolean;
  currentResult: {
    type?: GameStage;
    correctAnswer?: string;
    incorrectAnswer?: string;
  };
  resultData: UpdateStatisticsInput[];
  result: {
    errorCount: number;
  };
  questions: GameQuestion[];
  currentQuestion?: GameQuestion;
  progress: number;
}
