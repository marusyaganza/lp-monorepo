import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState
} from 'react';
import { Outlet } from 'react-router-dom';
import { SortBy, GamesQuery, TagsQuery } from '../../generated/graphql';
import { GameCard, Spinner, TagSelector } from '@lp/ui';
import { routes } from '../../constants/routes';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import {
  TagDataType,
  getStoredData,
  storeData
} from '../../util/localStorageUtils';
import { SortControls } from '../../components/SortControls/SortControls';
import { GAMES, TAGS_QUERY } from '../../gql/queries';

import styles from './GamesPage.module.css';
import { useQuery } from '@apollo/client';

const OPTIONS = {
  [SortBy.ErrorCount]: 'Errors',
  [SortBy.LastTimePracticed]: 'Last Practice Date',
  [SortBy.PracticedTimes]: 'Practiced Times',
  [SortBy.SuccessRate]: 'Success Rate',
  [SortBy.MemoryRefresher]: 'Memory Refresher'
};

const GamesPage = () => {
  const { error, loading, data } = useQuery<GamesQuery>(GAMES);
  const { setNotification, language } = useContext(AppContext);
  const [sortBy, setSortBy] = useState('');
  const [tags, setTags] = useState<string[] | undefined>();
  const [isReverseOrder, setIsReverseOrder] = useState(false);

  const tagsResult = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });

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

  const handleTagsChange = useCallback(
    (val: string[]) => {
      setTags(val);
      const storedTags =
        getStoredData<'gameTags'>('gameTags') || ({} as TagDataType);
      storedTags[language] = val;
      storeData('gameTags', storedTags);
    },
    [language]
  );

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
    const storedSortBy = getStoredData<'sortGamesBy'>('sortGamesBy');
    const storedIsReverseOrder =
      getStoredData<'gamesSortOrder'>('gamesSortOrder');
    const storedTags = getStoredData<'gameTags'>('gameTags')?.[language];

    if (storedSortBy) {
      setSortBy(storedSortBy);
    }
    if (storedIsReverseOrder) {
      setIsReverseOrder(storedIsReverseOrder);
    }
    if (storedTags) {
      setTags(storedTags);
    }
  }, [language]);

  return (
    <PageLayout className={styles.page}>
      <div className={styles.topContainer}>
        <h1 className={styles.pageTitle}>Select a training</h1>
        <section className={styles.topSection}>
          <SortControls
            className={styles.sortControls}
            sortBy={sortBy}
            initialOrderValue={isReverseOrder}
            options={OPTIONS}
            onOrderChange={handleOrderChange}
            onSortChange={handleSortingParamChange}
            blankOption="none"
          />
          <TagSelector
            // @ts-ignore
            tags={tagsResult?.data?.tags}
            value={tags}
            label="tags"
            onChange={handleTagsChange}
            className={styles.tagsSelector}
          />
        </section>
      </div>
      {loading && <Spinner />}
      {data?.games && (
        <div className={styles.catalog}>
          <ul data-cy="gamesList" className={styles.gamesList}>
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
        </div>
      )}
      <Outlet />
    </PageLayout>
  );
};

export default GamesPage;
