import { DEFAULT_TENSE } from '../../../constants/defaultValues';
import { TENSES } from '../../../constants/tenses';
import { Game, Tense } from '../../../generated/graphql';
import { getGameTask } from '../../helpers'; // Adjust import path as necessary

describe('getGameTask', () => {
  test('should return correct task for Game.Audio', () => {
    const result = getGameTask(Game.Audio);
    expect(result).toBe("Type the word that you've heard");
  });

  test('should return correct task for Game.SelectDef', () => {
    const result = getGameTask(Game.SelectDef);
    expect(result).toBe('Select a definition that means ');
  });

  test('should return correct task for Game.SelectWord', () => {
    const result = getGameTask(Game.SelectWord);
    expect(result).toBe('Select a word that means ');
  });

  test('should return correct task for Game.TypeWord', () => {
    const result = getGameTask(Game.TypeWord);
    expect(result).toBe('Type a word that means ');
  });

  test('should return correct task for Game.Conjugation with default tense', () => {
    const result = getGameTask(Game.Conjugation);
    expect(result).toBe(`Conjugate the verb in ${TENSES[DEFAULT_TENSE]}`);
  });

  test('should return correct task for Game.Conjugation with specific tense (Impf)', () => {
    const result = getGameTask(Game.Conjugation, Tense.Impf);
    expect(result).toBe(`Conjugate the verb in ${TENSES[Tense.Impf]}`);
  });

  test('should return correct task for Game.Conjugation with specific tense (Pind)', () => {
    const result = getGameTask(Game.Conjugation, Tense.Pind);
    expect(result).toBe(`Conjugate the verb in ${TENSES[Tense.Pind]}`);
  });

  test('should use DEFAULT_TENSE when tenseInput is null', () => {
    const result = getGameTask(Game.Conjugation, null);
    expect(result).toBe(`Conjugate the verb in ${TENSES[DEFAULT_TENSE]}`);
  });
});
