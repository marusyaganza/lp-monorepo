import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState
} from 'react';
import { Outlet } from 'react-router-dom';
import { SortBy, useGamesQuery } from '../../generated/graphql';
import { GameCard, Spinner } from '@lp/ui';
import { routes } from '../../constants/routes';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import { getStoredData, storeData } from '../../util/localStorageUtils';
import { SortControls } from '../../components/SortControls/SortControls';

import styles from './GamesPage.module.css';

const OPTIONS = {
  [SortBy.ErrorCount]: 'Errors',
  [SortBy.LastTimePracticed]: 'Last Practice Date',
  [SortBy.PracticedTimes]: 'Practiced Times'
};

const GamesPage = () => {
  const { error, loading, data } = useGamesQuery();
  const { setNotification } = useContext(AppContext);
  const [sortBy, setSortBy] = useState('');
  const [isReverseOrder, setIsReverseOrder] = useState(false);

  const searchStr = useMemo(() => {
    const sort = sortBy ? `&sortBy=${sortBy}` : '';
    return `?isReverseOrder=${isReverseOrder}${sort}`;
  }, [sortBy, isReverseOrder]);

  const handleSortingParamChange = useCallback((val: string) => {
    setSortBy(val);
    storeData('sortGamesBy', val);
  }, []);

  const handleOrderChange = useCallback((value: boolean) => {
    setIsReverseOrder(value);
    storeData('gamesSortOrder', value);
  }, []);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong',
        sameLocation: true
      });
    }
  }, [error]);

  useEffect(() => {
    const storedSortBy = getStoredData<'sortGamesBy'>('sortGamesBy');
    const storedIsReverseOrder =
      getStoredData<'gamesSortOrder'>('gamesSortOrder');
    if (storedSortBy) {
      setSortBy(storedSortBy);
    }
    if (storedIsReverseOrder) {
      setIsReverseOrder(storedIsReverseOrder);
    }
  }, []);

  return (
    <PageLayout>
      <div className={styles.topContainer}>
        <h1 className={styles.pageTitle}>Select a training</h1>
        <SortControls
          sortBy={sortBy}
          initialOrderValue={isReverseOrder}
          options={OPTIONS}
          onOrderChange={handleOrderChange}
          onSortChange={handleSortingParamChange}
          blankOption="none"
        />
      </div>
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
                  linkUrl={`/${
                    routes.games
                  }/${game.type?.toLocaleLowerCase()}${searchStr}`}
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
