import { DEFAULT_TENSE } from '../../../../constants/defaultValues';
import { Game, Tense } from '../../../../generated/graphql';
import { getTenseFilter } from '../sortingHelpers';

describe('getTenseFilter', () => {
  it('should return an empty object if gameType is not Conjugation', () => {
    expect(getTenseFilter(Game.Audio)).toEqual({});
    expect(getTenseFilter(Game.SelectDef)).toEqual({});
    expect(getTenseFilter(Game.SelectWord)).toEqual({});
    expect(getTenseFilter(Game.TypeWord)).toEqual({});
  });

  it('should return conjugation filter with DEFAULT_TENSE if tense is not provided or null', () => {
    expect(getTenseFilter(Game.Conjugation)).toEqual({
      'conjugation.cjid': DEFAULT_TENSE
    });
    expect(getTenseFilter(Game.Conjugation, null)).toEqual({
      'conjugation.cjid': DEFAULT_TENSE
    });
  });

  it('should return conjugation filter with provided tense', () => {
    expect(getTenseFilter(Game.Conjugation, Tense.Impf)).toEqual({
      'conjugation.cjid': Tense.Impf
    });
    expect(getTenseFilter(Game.Conjugation, Tense.Pret)).toEqual({
      'conjugation.cjid': Tense.Pret
    });
    expect(getTenseFilter(Game.Conjugation, Tense.Pprf)).toEqual({
      'conjugation.cjid': Tense.Pprf
    });
  });
});
