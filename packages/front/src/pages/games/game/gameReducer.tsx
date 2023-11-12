import { Game } from '@lp/ui/src/generated/graphql';

export enum GameAction {
  CHECK_ANSWER = 'CHECK_ANSWER',
  NEXT = 'NEXT',
  START = 'START'
}

export interface GameState {
  currentIndex: number;
  isCompleted: boolean;
  currentResult: {
    type?: 'initial' | 'success' | 'error';
    correctAnswer?: string;
    incorrectAnswer?: string;
  };
  resultData: {
    id: string;
    hasError: boolean;
    gameType: Game;
    isLearned?: boolean;
  }[];
  result: {
    errorCount: number;
  };
  wordsPerSession: number;
}

export const initialState: GameState = {
  currentIndex: 0,
  isCompleted: false,
  currentResult: {
    type: 'initial'
  },
  resultData: [],
  result: { errorCount: 0 },
  wordsPerSession: 0
};

type CheckAnswerAction = {
  type: GameAction.CHECK_ANSWER;
  payload: {
    correctAnswer: string;
    answer: string;
    id: string;
    gameType: Game;
  };
};

type NextAction = {
  type: GameAction.NEXT;
  payload?: {
    isLearned?: boolean;
  };
};

type StartAction = {
  type: GameAction.START;
  payload: { wordsPerSession: number };
};

export function gameReducer(
  state: GameState,
  action: CheckAnswerAction | NextAction | StartAction
) {
  const { type } = action;
  if (type === GameAction.START) {
    const { wordsPerSession } = action.payload;
    return {
      ...initialState,
      wordsPerSession,
      result: { errorCount: 0 },
      resultData: []
    };
  }
  if (type === GameAction.CHECK_ANSWER) {
    const { correctAnswer, answer, id, gameType } = action.payload;
    const newState = { ...state };
    if (answer === correctAnswer) {
      newState.currentResult = {
        type: 'success',
        correctAnswer: correctAnswer
      };
      newState.resultData.push({ id, hasError: false, gameType });
    } else {
      newState.currentResult = {
        type: 'error',
        correctAnswer: correctAnswer,
        incorrectAnswer: answer
      };
      newState.result.errorCount++;
      newState.resultData.push({ id, hasError: true, gameType });
    }
    return newState;
  }
  if (type === GameAction.NEXT) {
    const newState = { ...state };
    const index = state.currentIndex;
    if (index === state.wordsPerSession - 1) {
      newState.isCompleted = true;
    } else {
      newState.currentIndex = state.currentIndex + 1;
    }
    if (action?.payload?.isLearned) {
      newState.resultData[index].isLearned = true;
    }
    newState.currentResult = {};
    return newState;
  }
  return state;
}
