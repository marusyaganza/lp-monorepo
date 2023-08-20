import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState
} from 'react';
import { Outlet } from 'react-router-dom';
import { SortBy, useGamesQuery } from '../../generated/graphql';
import { GameCard, Spinner, useSelect, Checkbox, Icon } from '@lp/ui';
import { routes } from '../../constants/routes';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import { getStoredData, storeData } from '../../util/localStorageUtils';

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
    storeData('sortBy', val);
  }, []);

  const { Select, Option, setValue } = useSelect<string>({
    onChange: handleSortingParamChange,
    initialValue: sortBy
  });
  const handleOrderChange = useCallback((value: boolean) => {
    setIsReverseOrder(value);
    storeData('isReverseOrder', value);
  }, []);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [error]);

  useEffect(() => {
    const storedSortBy = getStoredData<'sortBy'>('sortBy');
    const storedIsReverseOrder =
      getStoredData<'isReverseOrder'>('isReverseOrder');
    if (storedSortBy) {
      setSortBy(storedSortBy);
      setValue(storedSortBy);
    }
    if (storedIsReverseOrder) {
      setIsReverseOrder(storedIsReverseOrder);
    }
  }, []);

  const renderValue = (val?: string) => {
    // @ts-ignore
    return OPTIONS?.[val] ? OPTIONS[val] : 'Select words by';
  };

  const renderSelect = () => {
    return (
      <div className={styles.orderControls}>
        <Select
          className={styles.select}
          value={sortBy}
          renderValue={renderValue}
          variant="withIcon"
          size="M"
        >
          <Option value="">none</Option>
          <Option value={SortBy.LastTimePracticed}>
            {OPTIONS.lastTimePracticed}
          </Option>
          <Option value={SortBy.PracticedTimes}>
            {OPTIONS.practicedTimes}
          </Option>
          <Option value={SortBy.ErrorCount}>{OPTIONS.errorCount}</Option>
        </Select>
        <Checkbox
          onChange={handleOrderChange}
          initialValue={isReverseOrder}
          variant="withIcon"
          iconId={isReverseOrder ? 'asc' : 'desc'}
        />
      </div>
    );
  };

  return (
    <PageLayout>
      <div className={styles.topContainer}>
        <h1 className={styles.pageTitle}>Select a training</h1>
        {renderSelect()}
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
