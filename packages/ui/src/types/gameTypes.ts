import { RefObject } from 'react';
import {
  GameQuestion,
  Language,
  Score,
  UpdateStatisticsInput
} from '../generated/graphql';
import { FocusableHTMLElement } from './types';

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
  nextQuestion?: string;
  progress: number;
}

export interface GameResultType {
  hasError: boolean;
  score: Score;
}

export interface GameProps {
  task: string;
  audioUrl?: string | null;
  shortDef?: string | null;
  options?: string[] | null;
  language?: Language;
  question: string[];
  nextQuestion?: string;
  onSubmit: (value: GameResultType) => void;
  inputRef: RefObject<FocusableHTMLElement>;
  className?: string;
  onNext: () => void;
  buttonRef: RefObject<FocusableHTMLElement>;
  currentStage: GameStage;
  correctAnswer: string[];
}

export enum GameStage {
  Initial = 'initial',
  Success = 'success',
  Error = 'error'
}
