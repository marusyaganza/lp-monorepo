import { DEFAULT_TENSE } from '../../../../constants/defaultValues';
import { Game, Tense } from '../../../../generated/graphql';
import { GAME_FILTERS, getGameFilters } from '../sortingHelpers';

describe('getGameFilters', () => {
  const timesToLearn = 5;

  it('should return learning filter for memory refresher', () => {
    const result = getGameFilters(Game.Audio, timesToLearn, true);

    expect(result).toEqual({
      ...GAME_FILTERS[Game.Audio],
      $or: [
        { [`statistics.${Game.Audio}.successRate`]: { $gte: timesToLearn } },
        { isLearned: true }
      ]
    });
  });

  it('should return learning filter for non-memory refresher', () => {
    const result = getGameFilters(Game.Audio, timesToLearn, false);

    expect(result).toEqual({
      ...GAME_FILTERS[Game.Audio],
      isLearned: { $ne: true },
      $or: [
        { [`statistics.${Game.Audio}.successRate`]: { $lt: timesToLearn } },
        { [`statistics.${Game.Audio}.successRate`]: null }
      ]
    });
  });

  it('should return tense filter when game type is Conjugation', () => {
    const result = getGameFilters(
      Game.Conjugation,
      timesToLearn,
      true,
      Tense.Impf
    );

    expect(result).toEqual({
      ...GAME_FILTERS[Game.Conjugation],
      $or: [
        {
          [`statistics.${Game.Conjugation}.successRate`]: { $gte: timesToLearn }
        },
        { isLearned: true }
      ],
      'conjugation.cjid': Tense.Impf
    });
  });

  it('should return default tense filter if tense is not provided', () => {
    const result = getGameFilters(Game.Conjugation, timesToLearn, false);

    expect(result).toEqual({
      ...GAME_FILTERS[Game.Conjugation],
      isLearned: { $ne: true },
      $or: [
        {
          [`statistics.${Game.Conjugation}.successRate`]: { $lt: timesToLearn }
        },
        { [`statistics.${Game.Conjugation}.successRate`]: null }
      ],
      'conjugation.cjid': DEFAULT_TENSE
    });
  });

  it('should return empty filter for non-Conjugation game types', () => {
    const result = getGameFilters(Game.SelectWord, timesToLearn, false);

    expect(result).toEqual({
      isLearned: { $ne: true },
      $or: [
        {
          [`statistics.${Game.SelectWord}.successRate`]: { $lt: timesToLearn }
        },
        { [`statistics.${Game.SelectWord}.successRate`]: null }
      ]
    });
  });
});
