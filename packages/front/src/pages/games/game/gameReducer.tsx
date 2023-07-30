export enum GameAction {
  CHECK_ANSWER = 'CHECK_ANSWER',
  NEXT = 'NEXT',
  START = 'START'
}

export interface GameState {
  currentIndex: number;
  isCompleted: boolean;
  currentResult: {
    type: 'initial' | 'success' | 'error';
    correctOption?: string;
    incorrectOption?: string;
  };
  resultData: {
    id: string;
    hasError: boolean;
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
  };
};

type NextAction = {
  type: GameAction.NEXT;
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
    const { correctAnswer, answer, id } = action.payload;
    const newState = { ...state };
    if (answer === correctAnswer) {
      newState.currentResult = {
        type: 'success',
        correctOption: correctAnswer
      };
      newState.resultData.push({ id, hasError: false });
    } else {
      newState.currentResult = {
        type: 'error',
        correctOption: correctAnswer,
        incorrectOption: answer
      };
      newState.result.errorCount++;
      newState.resultData.push({ id, hasError: true });
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
    newState.currentResult = { type: 'initial' };
    return newState;
  }
  return state;
}
