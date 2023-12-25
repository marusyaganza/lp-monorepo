import React, { useMemo, useEffect, useContext, useReducer } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  GameQuery,
  Game as GameType,
  SaveGameResultMutation,
  SortBy
} from '../../../generated/graphql';
import { routes } from '../../../constants/routes';
import { GameFooter, Progress, GameResult, Button, Game } from '@lp/ui';
import { AppContext } from '../../../app-context/appContext';
import { PageSpinner } from '../../../components/PageSpinner/PageSpinner';
import { gameReducer, initialState, GameAction } from './gameReducer';

import styles from './GamePage.module.css';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GAME } from '../../../gql/queries';
import { SAVE_GAME_RESULT } from '../../../gql/mutations';

const GamePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [fetchGameData, { loading, error, data }] = useLazyQuery<GameQuery>(
    GAME,
    {
      fetchPolicy: 'no-cache'
    }
  );
  const [saveResultFunc, saveResultData] =
    useMutation<SaveGameResultMutation>(SAVE_GAME_RESULT);

  const { setNotification, language, userId } = useContext(AppContext);
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const [searchParams] = useSearchParams();

  const sortBy = useMemo(() => {
    const param = searchParams.get('sortBy');
    return Object.values(SortBy).includes(param as SortBy)
      ? (param as SortBy)
      : null;
  }, [searchParams]);

  const isReverseOrder = useMemo(
    () => searchParams.get('isReverseOrder') === 'true',
    [searchParams]
  );

  const gameId = useMemo<GameType | undefined>(() => {
    const gameId = params.gameId?.toUpperCase();
    const isExistingGame = Object.values(GameType).includes(gameId as GameType);
    return isExistingGame ? (gameId as GameType) : undefined;
  }, [params]);
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
      fetchGameData({
        variables: {
          input: {
            gameType: gameId,
            language,
            sortBy,
            isReverseOrder
          }
        }
      });
    } else {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: 'game is not found',
        targetLocation: `/${routes.games}`
      });
      navigate(`/${routes.games}`);
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
        subText: error?.message || 'something went wrong',
        targetLocation: `/${routes.games}`
      });
      navigate(`/${routes.games}`);
    }
  }, [error]);

  useEffect(() => {
    if (saveResultData.error) {
      setNotification({
        variant: 'error',
        text: 'Saving game result failed',
        subText: saveResultData.error?.message || 'something went wrong',
        targetLocation: `/${routes.games}`
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
    if (questions?.length && data?.game) {
      const answer = val;
      dispatch({
        type: GameAction.CHECK_ANSWER,
        payload: {
          gameType: data.game.type,
          answer,
          correctAnswer: questions[state.currentIndex]?.answer || '',
          id: questions[state.currentIndex].wordId
        }
      });
    }
  };

  const handleNext = (val?: boolean) => {
    const isLearned = val ?? false;
    dispatch({ type: GameAction.NEXT, payload: { isLearned } });
  };

  const handleFinish = () => {
    navigate(`/${routes.games}`);
  };

  const isLoading = loading || saveResultData.loading;

  return (
    <>
      {isLoading && <PageSpinner />}
      {data && !isLoading && (
        <div className={styles.container}>
          {!isCompleted && (
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
          )}
          <main className={styles.game}>
            {data && !isCompleted && (
              <Game
                currentResult={state.currentResult}
                additionalInfo={questions?.[state.currentIndex]?.additionalInfo}
                type={data.game.type}
                onSubmit={handlerSubmit}
                question={questions?.[state.currentIndex].question as string[]}
                options={
                  questions?.[state.currentIndex]?.options as
                    | string[]
                    | undefined
                }
                task={data?.game?.task}
                memoryRefresherMode={sortBy === SortBy.MemoryRefresher}
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
          {!isCompleted && (
            <GameFooter variant={state.currentResult.type || 'inProgress'} />
          )}
        </div>
      )}
    </>
  );
};

export default GamePage;
