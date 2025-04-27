import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  SaveGameResultMutation,
  UpdateStatisticsInput
} from '../../../generated/graphql';
import { routes } from '../../../constants/routes';
import { GameEngine } from '@lp/ui';
import { AppContext } from '../../../app-context/appContext';
import { PageSpinner } from '../../../components/PageSpinner/PageSpinner';

import { useMutation, useQuery } from '@apollo/client';
import { GAME_QUERY } from '../../../gql/queries';
import { SAVE_GAME_RESULT_MUTATION } from '../../../gql/mutations';

const GamePage = () => {
  const navigate = useNavigate();
  const { setNotification, language, userId } = useContext(AppContext);

  const location = useLocation();
  const { state } = location;

  const { loading, error, data } = useQuery(GAME_QUERY, {
    variables: {
      input: {
        gameType: state.gameType,
        language,
        sortBy: state.sortBy || undefined,
        isReverseOrder: state.isReverseOrder,
        tense: state.tense,
        wordId: state.wordId,
        tags: state.tags
      }
    },
    fetchPolicy: 'network-only'
  });

  const [saveResultFunc, saveResultData] = useMutation<SaveGameResultMutation>(
    SAVE_GAME_RESULT_MUTATION
  );

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

  const handleClose = () => {
    navigate(`/${routes.games}`);
  };

  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    }
  }, [userId]);

  const handleFinish = (input: UpdateStatisticsInput[]) => {
    saveResultFunc({
      variables: {
        input: input.map(item => ({ ...item, tense: state.tense }))
      },
      onCompleted: () => {
        navigate(`/${routes.games}`);
      },
      onError: err => {
        setNotification({
          variant: 'error',
          text: 'Saving game result failed',
          subText: err?.message || 'something went wrong',
          targetLocation: `/${routes.games}`
        });
      }
    });
  };

  const isLoading = loading || saveResultData.loading;

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      {data && (
        <GameEngine
          language={language}
          gameData={data?.game}
          onFinish={handleFinish}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default GamePage;
