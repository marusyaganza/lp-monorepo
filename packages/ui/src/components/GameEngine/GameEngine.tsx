import React, { useEffect, useReducer } from 'react';

import styles from './GameEngine.module.css';
import { GameData, UpdateStatisticsInput } from '../../generated/graphql';
import { GameAction, gameReducer, initialState } from './gameReducer';
import { GameFooter } from '../GameFooter/GameFooter';
import { GameResult } from '../GameResult/GameResult';
import { GameComponent } from '../Game/GameComponent';
import { Button } from '../Button/Button';
import { Progress } from '../Progress/Progress';

export interface GameEngineProps {
  gameData: GameData;
  onClose: () => void;
  onFinish: (val: UpdateStatisticsInput[]) => void;
}
/** GameEngine component runs the game */
export const GameEngine = ({
  gameData,
  onClose,
  onFinish
}: GameEngineProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const { questions } = gameData;
    if (questions?.length) {
      dispatch({
        type: GameAction.START,
        payload: { questions }
      });
    }
  }, [gameData]);

  const handlerSubmit = (hasError: boolean) => {
    const questions = gameData?.questions;
    if (questions?.length) {
      dispatch({
        type: GameAction.CHECK_ANSWER,
        payload: {
          gameType: gameData.type,
          hasError
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
        <main className={styles.game}>
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
          correctAnswer={state.currentQuestion.answer}
          options={state.currentQuestion?.options}
          task={gameData?.task}
          onNext={handleNext}
        />
      </main>
      <GameFooter variant={state.currentResult.type || 'inProgress'} />
    </div>
  );
};
