import { GameStage, GameState } from '../../types/gameTypes';
import { Game, GameQuestion, Score } from '../../generated/graphql';

export enum GameAction {
  CHECK_ANSWER = 'CHECK_ANSWER',
  NEXT = 'NEXT',
  START = 'START'
}

export const initialState: GameState = {
  currentIndex: 0,
  isCompleted: false,
  currentResult: {
    type: GameStage.Initial
  },
  resultData: [],
  result: { errorCount: 0 },
  questions: [],
  progress: 0
};

type CheckAnswerAction = {
  type: GameAction.CHECK_ANSWER;
  payload: {
    hasError: boolean;
    gameType: Game;
    score: Score;
  };
};

type NextAction = {
  type: GameAction.NEXT;
};

type StartAction = {
  type: GameAction.START;
  payload: { questions: GameQuestion[]; gameType: Game };
};

export function gameReducer(
  state: GameState,
  action: CheckAnswerAction | NextAction | StartAction
): GameState {
  const { type } = action;

  if (type === GameAction.START) {
    const { questions, gameType } = action.payload;
    return {
      ...initialState,
      result: { errorCount: 0 },
      resultData: [],
      questions,
      currentQuestion: questions[0],
      nextQuestion:
        gameType === Game.Image ? questions?.[1]?.question?.[0] : undefined
    };
  }

  if (type === GameAction.CHECK_ANSWER) {
    const { gameType, hasError, score } = action.payload;
    const { wordId } = state.questions[state.currentIndex];
    const newState = { ...state };
    newState.resultData.push({ id: wordId, hasError, gameType, score });
    newState.currentResult = {
      type: hasError ? GameStage.Error : GameStage.Success
    };
    if (hasError) {
      newState.result.errorCount++;
    }
    if (
      gameType === Game.Image &&
      state.currentIndex < state.questions.length
    ) {
      newState.nextQuestion =
        state.questions[state.currentIndex + 1]?.question?.[0];
    }
    return newState;
  }

  if (type === GameAction.NEXT) {
    const newState = { ...state };
    const index = state.currentIndex;
    if (index === state.questions.length - 1) {
      newState.isCompleted = true;
      newState.progress = 100;
    } else {
      newState.currentIndex = state.currentIndex + 1;
      newState.progress =
        ((state.currentIndex + 1) * 100) / state.questions.length;
      newState.currentQuestion = newState.questions[newState.currentIndex];
    }
    newState.currentResult = { type: GameStage.Initial };
    return newState;
  }
  return state;
}
