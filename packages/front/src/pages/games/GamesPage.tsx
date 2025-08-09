import React, { useContext, useEffect, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SortBy, GamesQuery, TagsQuery, Game } from '../../generated/graphql';
import { GameCard, Spinner, TagSelector } from '@lp/ui';
import { routes } from '../../constants/routes';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';
import { getStoredData, storeData } from '../../util/localStorageUtils';
import { SortControls } from '../../components/SortControls/SortControls';
import { GAMES_QUERY, TAGS_QUERY } from '../../gql/queries';

import styles from './GamesPage.module.css';
import { useQuery } from '@apollo/client';

const OPTIONS: Record<SortBy, string> = {
  [SortBy.ErrorCount]: 'Errors',
  [SortBy.LastTimePracticed]: 'Last Practice Date',
  [SortBy.PracticedTimes]: 'Practiced Times',
  [SortBy.SuccessRate]: 'Success Rate',
  [SortBy.MemoryRefresher]: 'Memory Refresher',
  [SortBy.SpacedRepetition]: 'Spaced Repetition'
};

const GamesPage = () => {
  const { setNotification, language, isDemo } = useContext(AppContext);
  const [sortBy, setSortBy] = useState(SortBy.SpacedRepetition);
  const [tags, setTags] = useState<string[] | undefined>();
  const [isReverseOrder, setIsReverseOrder] = useState(false);

  const { error, loading, data } = useQuery<GamesQuery>(GAMES_QUERY, {
    variables: {
      input: {
        language,
        tags
      }
    },
    fetchPolicy: 'network-only'
  });
  const tagsResult = useQuery<TagsQuery>(TAGS_QUERY, {
    variables: { language }
  });

  const handleSortingParamChange = useCallback((val: string) => {
    setSortBy(val as SortBy);
    storeData('sortGamesBy', val as SortBy);
  }, []);

  const handleOrderChange = useCallback((value: boolean) => {
    setIsReverseOrder(value);
    storeData('gamesSortOrder', value);
  }, []);

  const handleTagsChange = useCallback(
    (val: string[]) => {
      setTags(val);
      const storedTags = getStoredData('gameTags') || {};
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
    const storedSortBy = getStoredData('sortGamesBy');
    const storedIsReverseOrder = getStoredData('gamesSortOrder');
    const storedTags = getStoredData('gameTags')?.[language];

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
          {isDemo && (
            <SortControls
              className={styles.sortControls}
              sortBy={sortBy}
              initialOrderValue={isReverseOrder}
              options={OPTIONS}
              onOrderChange={handleOrderChange}
              onSortChange={handleSortingParamChange}
              blankOption="none"
            />
          )}
          {!!tags?.length && (
            <TagSelector
              dataCy="tag-selector"
              showNoTagsTag
              tags={tagsResult?.data?.tags}
              value={tags}
              label="tags"
              onChange={handleTagsChange}
              className={styles.tagsSelector}
            />
          )}
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
              const gameLink =
                game.type === Game.Conjugation
                  ? `${routes.games}/${routes.conjugate}`
                  : `${routes.games}/${game.type?.toLocaleLowerCase()}`;
              return (
                <li key={game.id}>
                  <GameCard
                    game={game}
                    state={{
                      sortBy,
                      isReverseOrder,
                      gameType: game.type,
                      tags
                    }}
                    linkUrl={`/${gameLink}`}
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
