import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGamesQuery } from '../../generated/graphql';
import { GameCard, Spinner } from '@lp/ui';
import { routes } from '../../../constants/routes';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import styles from './GamesPage.module.css';

const GamesPage = () => {
  const { error, loading, data } = useGamesQuery();
  const { setNotification } = useContext(AppContext);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [error]);

  return (
    <PageLayout>
      <h1 className={styles.pageTitle}>Select a training</h1>
      {loading && <Spinner />}
      {data?.games && (
        <ul className={styles.gamesList}>
          {data.games.map(game => {
            if (!game) {
              return;
            }
            return (
              <li key={game.id}>
                <GameCard
                  game={game}
                  linkUrl={`/${routes.games}/${game.type?.toLocaleLowerCase()}`}
                />
              </li>
            );
          })}
        </ul>
      )}
      <Outlet />
    </PageLayout>
  );
};

export default GamesPage;
