import React, { useEffect, useReducer } from 'react';

import styles from './GameEngine.module.css';
import {
  GameData,
  Language,
  UpdateStatisticsInput
} from '../../generated/graphql';
import { GameAction, gameReducer, initialState } from './gameReducer';
import { GameFooter } from '../GameFooter/GameFooter';
import { GameResult } from '../GameResult/GameResult';
import { GameComponent } from '../Game/GameComponent';
import { Button } from '../Button/Button';
import { Progress } from '../Progress/Progress';
import { GameResultType as GameResultType } from '../../types/gameTypes';
import { cn } from '../../utils/classnames';

export interface GameEngineProps {
  gameData: GameData;
  language?: Language;
  onClose: () => void;
  onFinish: (val: UpdateStatisticsInput[]) => void;
}
/** GameEngine component runs the game */
export const GameEngine = ({
  gameData,
  onClose,
  language,
  onFinish
}: GameEngineProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const { questions } = gameData;
    if (questions?.length) {
      dispatch({
        type: GameAction.START,
        payload: { questions, gameType: gameData.type }
      });
    }
  }, [gameData]);

  const handlerSubmit = (result: GameResultType) => {
    const questions = gameData?.questions;
    if (questions?.length) {
      dispatch({
        type: GameAction.CHECK_ANSWER,
        payload: {
          gameType: gameData.type,
          ...result
        }
      });
    }
  };

  const handleNext = () => {
    dispatch({ type: GameAction.NEXT });
  };

  const handleFinish = () => {
    onFinish(state.resultData);
  };

  if (state?.isCompleted) {
    return (
      <div className={styles.container}>
        <main className={cn(styles.game, styles.resultScreen)}>
          <GameResult
            wordCount={state.questions.length}
            erroCount={state.result.errorCount}
            buttonClickHandler={handleFinish}
          />
        </main>
      </div>
    );
  }

  if (!state.currentQuestion?.question) {
    return;
  }

  return (
    <div className={styles.container}>
      <header className={styles.progress}>
        <Progress value={state.progress} />
        <Button
          variant="icon"
          data-cy="exit-game"
          iconId="close"
          iconHeight={30}
          onClick={onClose}
        >
          Exit game
        </Button>
      </header>
      <main className={styles.game}>
        <GameComponent
          currentResult={state.currentResult}
          additionalInfo={state.currentQuestion?.additionalInfo}
          type={gameData.type}
          onSubmit={handlerSubmit}
          question={state?.currentQuestion.question}
          nextQuestion={state?.nextQuestion}
          correctAnswer={state.currentQuestion.answer}
          options={state.currentQuestion?.options}
          task={gameData?.task}
          onNext={handleNext}
          language={language}
        />
      </main>
      <GameFooter variant={state.currentResult.type || 'inProgress'} />
    </div>
  );
};
