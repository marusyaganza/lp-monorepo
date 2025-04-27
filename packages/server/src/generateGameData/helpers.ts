import { DEFAULT_TENSE } from '../constants/defaultValues';
import _ from 'lodash';
import { TENSES } from '../constants/tenses';
import {
  DefExample,
  Game,
  Language,
  Tense,
  Word,
  WordDefinition
} from '../generated/graphql';
import { IMinimalWord } from '../types/types';
import { OperationResolutionError } from '../utils/apolloCustomErrors';
import { madeUphWords } from '../constants/madeUpWord';

export function getExamples(defs?: (WordDefinition | null)[] | null) {
  if (!Array.isArray(defs)) {
    return;
  }

  const examples = defs
    .flatMap(def => def?.examples)
    .filter(Boolean)
    .slice(0, 5);

  return examples as DefExample[];
}

export function getGameTask(gameType: Game, tenseInput?: Tense | null) {
  const tense = tenseInput || DEFAULT_TENSE;
  const tasks = {
    [Game.Audio]: "Type the word that you've heard",
    [Game.SelectDef]: 'Select a definition that means ',
    [Game.SelectWord]: 'Select a word that means ',
    [Game.TypeWord]: 'Type a word that means ',
    [Game.Image]: 'Type the name of the object shown in the picture.',
    [Game.Gender]: 'Pick the Correct Gender',
    [Game.Speaking]:
      'Click the microphone and say the word matching the description.',
    [Game.Conjugation]: `Conjugate the verb in ${TENSES[tense]}`
  };
  return tasks[gameType];
}

/**Replaces word's `name` in `def` with `[...]` block
 * required to exclude the answer from the question
 */
export function prepareDef(def?: string | null, name?: string | null): string {
  if (!def || !name) {
    return '';
  }

  const replacement = ' [...] ';
  const endReplacement = ' [...]';
  const word = name.toLocaleLowerCase();

  let result = def.replaceAll(new RegExp(` ${word} `, 'gi'), replacement);

  if (result.toLocaleLowerCase().startsWith(`${word} `)) {
    result = result.replace(new RegExp(`${word} `, 'i'), replacement).trim();
  }

  if (
    result
      .toLocaleLowerCase()
      .replace(/[.,#!$%^&*;:{}=\-_`~()]/g, '')
      .endsWith(` ${word}`)
  ) {
    result = result.replace(new RegExp(` ${word}`, 'i'), endReplacement).trim();
  }

  return result;
}

export function generateOptions(
  data: Word[],
  count: number,
  currentWord: Word,
  language: Language
) {
  const extraWords = madeUphWords[language];

  const optCandidates: IMinimalWord[] = data.filter(
    word => word.id !== currentWord.id
  );

  let options: IMinimalWord[];

  if (optCandidates.length + extraWords.length < count - 1) {
    throw new OperationResolutionError(`Not enough words to generate options.`);
  }

  if (optCandidates.length < count) {
    const moreOptions = _.take(extraWords, count - optCandidates.length - 1);
    options = [...optCandidates, ...moreOptions];
  } else {
    const mixedWords = _.shuffle(optCandidates);
    options = _.take(mixedWords, count - 1);
  }

  options = [...options, currentWord];

  return _.shuffle(options);
}
