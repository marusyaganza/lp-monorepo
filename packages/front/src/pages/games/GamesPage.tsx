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
import { routes } from '../../../constants/routes';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import styles from './GamesPage.module.css';

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
  }, []);

  const handleOrderChange = useCallback((value: boolean) => {
    setIsReverseOrder(value);
  }, []);

  const [{ Select, Option }] = useSelect<string>({
    onChange: handleSortingParamChange
  });

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message || 'something went wrong'
      });
    }
  }, [error]);

  const renderValue = (val?: string) => (
    <div className={styles.selectValue}>{val || 'Select words by'}</div>
  );

  const renderOrderByButton = () => {
    return (
      <div>
        <Checkbox
          onChange={handleOrderChange}
          initialValue={isReverseOrder}
          variant="hidden"
          label={
            <Icon id={isReverseOrder ? 'asc' : 'desc'} width={22} height={20} />
          }
        />
      </div>
    );
  };

  const renderSelect = () => {
    return (
      <Select
        value={sortBy}
        renderValue={renderValue}
        renderIcon={renderOrderByButton}
        size="M"
      >
        <Option value="">none</Option>
        <Option value={SortBy.LastTimePracticed}>Last time practiced</Option>
        <Option value={SortBy.PracticedTimes}>Practiced times</Option>
        <Option value={SortBy.ErrorCount}>Errors made</Option>
      </Select>
    );
  };

  return (
    <PageLayout>
      <h1 className={styles.pageTitle}>Select a training</h1>
      <div className={styles.temporary}>{renderSelect()}</div>
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
