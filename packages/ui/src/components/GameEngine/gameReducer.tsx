import { GameStage, GameState } from '../../types/gameTypes';
import { Game, GameQuestion } from '../../generated/graphql';

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
    answer: string;
    gameType: Game;
  };
};

type NextAction = {
  type: GameAction.NEXT;
};

type StartAction = {
  type: GameAction.START;
  payload: { questions: GameQuestion[] };
};

export function gameReducer(
  state: GameState,
  action: CheckAnswerAction | NextAction | StartAction
): GameState {
  const { type } = action;

  if (type === GameAction.START) {
    const { questions } = action.payload;
    return {
      ...initialState,
      result: { errorCount: 0 },
      resultData: [],
      questions,
      currentQuestion: questions[0]
    };
  }

  if (type === GameAction.CHECK_ANSWER) {
    const { gameType, answer } = action.payload;
    const {
      answer: correctAnswer,
      wordId,
      alternativeSpelling
    } = state.questions[state.currentIndex];
    console.log('ans', answer, correctAnswer);
    const newState = { ...state };
    const formattedAnswer = answer.toLocaleLowerCase();
    if (
      formattedAnswer === correctAnswer.toLocaleLowerCase() ||
      alternativeSpelling?.some(
        word => word?.toLocaleLowerCase() === formattedAnswer
      )
    ) {
      newState.currentResult = {
        type: GameStage.Success,
        correctAnswer
      };
      newState.resultData.push({ id: wordId, hasError: false, gameType });
    } else {
      newState.currentResult = {
        type: GameStage.Error,
        correctAnswer: correctAnswer,
        incorrectAnswer: answer
      };
      newState.result.errorCount++;
      newState.resultData.push({ id: wordId, hasError: true, gameType });
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
        ((state.currentIndex + 1) * 100) / (state.questions.length + 1);
      newState.currentQuestion = newState.questions[newState.currentIndex];
    }
    newState.currentResult = {};
    return newState;
  }
  return state;
}
