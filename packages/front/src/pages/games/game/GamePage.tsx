import React, { useMemo, useEffect, useContext, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGameLazyQuery,
  Game as GameType,
  useSaveGameResultMutation
} from '../../../generated/graphql';
import { routes } from '../../../../constants/routes';
import { GameFooter, Progress, GameResult, Button, Game } from '@lp/ui';
import { AppContext } from '../../../app-context/appContext';
import { PageSpinner } from '../../../components/PageSpinner/PageSpinner';
import { gameReducer, initialState, GameAction } from './gameReducer';

import styles from './GamePage.module.css';

const GamePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [fetchGameData, { loading, error, data }] = useGameLazyQuery();
  const [saveResultFunc, saveResultData] = useSaveGameResultMutation();

  const { setNotification, language, userId } = useContext(AppContext);
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const gameId = useMemo(() => params.gameId?.toUpperCase(), [params]);
  const questions = useMemo(
    () => data?.game?.questions?.filter(Boolean),
    [data]
  );
  const isCompleted = useMemo(() => state?.isCompleted, [state?.isCompleted]);
  const progress = useMemo(
    () =>
      isCompleted
        ? 100
        : ((state.currentIndex + 1) * 100) / (state.wordsPerSession + 1),
    [state, isCompleted]
  );

  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (gameId) {
      const isExistingGame = Object.values(GameType).includes(
        gameId as GameType
      );
      if (isExistingGame) {
        fetchGameData({
          variables: { input: { gameType: gameId as GameType, language } }
        });
      } else {
        setNotification({
          variant: 'error',
          text: 'Error',
          subText: 'game is not found'
        });
        navigate(`/${routes.games}`);
      }
    }
  }, [gameId, language, fetchGameData, setNotification, navigate]);

  useEffect(() => {
    if (state.isCompleted) {
      saveResultFunc({ variables: { input: state.resultData } });
    }
  }, [state.isCompleted]);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
      navigate(`/${routes.games}`);
    }
  }, [error]);

  useEffect(() => {
    if (saveResultData.error) {
      setNotification({
        variant: 'error',
        text: 'Saving game result failed',
        subText: saveResultData.error?.message || 'something went wrong'
      });
      navigate(`/${routes.games}`);
    }
  }, [saveResultData.error]);

  useEffect(() => {
    if (questions?.length) {
      dispatch({
        type: GameAction.START,
        payload: { wordsPerSession: questions?.length }
      });
    }
  }, [questions]);

  const handleClose = () => {
    navigate(`/${routes.games}`);
  };

  const handlerSubmit = (val: string) => {
    if (questions?.length) {
      dispatch({
        type: GameAction.CHECK_ANSWER,
        payload: {
          answer: val,
          correctAnswer: questions[state.currentIndex]?.answer || '',
          id: questions[state.currentIndex].wordId
        }
      });
    }
  };

  const handleNext = () => {
    dispatch({ type: GameAction.NEXT });
  };

  const handleFinish = () => {
    navigate(`/${routes.games}`);
  };

  console.log('state', state);

  return (
    <>
      {(loading || saveResultData.loading) && <PageSpinner />}
      {data && (
        <div className={styles.container}>
          <header className={styles.progress}>
            <Progress value={progress} />
            <Button
              variant="icon"
              iconId="close"
              iconHeight={30}
              onClick={handleClose}
            >
              Exit game
            </Button>
          </header>
          <main className={styles.game}>
            {data && !isCompleted && (
              <Game
                currentResult={state.currentResult}
                type={data.game.type}
                onSubmit={handlerSubmit}
                question={questions?.[state.currentIndex].question as string[]}
                options={
                  questions?.[state.currentIndex]?.options as
                    | string[]
                    | undefined
                }
                task={data?.game?.task}
                onNext={handleNext}
              />
            )}
            {isCompleted && (
              <GameResult
                wordCount={state.wordsPerSession}
                erroCount={state.result.errorCount}
                buttonClickHandler={handleFinish}
              />
            )}
          </main>
          <GameFooter
            className={styles.footer}
            variant={state.currentResult.type}
          />
        </div>
      )}
    </>
  );
};

export default GamePage;
