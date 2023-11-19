import {
  Game,
  Word,
  GameData,
  GameConfig,
  Language,
  WordDefinition,
  DefExample
} from '../generated/graphql';
import { OperationResolutionError } from './apolloCustomErrors';
import { madeUphWords } from '../mocks/madeUpWord';

export type GenerateGameDataFuncType = (
  gameType: Game,
  words: Word[],
  config: GameConfig
) => GameData;

const tasks = {
  [Game.Audio]: "Type the word that you've heard",
  [Game.SelectDef]: 'Select a definition that means ',
  [Game.SelectWord]: 'Select a word that means ',
  [Game.TypeWord]: 'Type a word that means '
};

export function generateRandomNumber(limit: number) {
  return Math.floor(Math.random() * limit);
}

export function getExamples(defs?: (WordDefinition | null)[] | null) {
  if (!Array.isArray(defs)) {
    return;
  }
  return defs
    .reduce((acc?: (DefExample | null)[], curr?: WordDefinition | null) => {
      const examples = curr?.examples;
      if (examples && Array.isArray(examples)) {
        return acc?.concat(examples);
      }
      return acc;
    }, [])
    ?.filter(Boolean);
}

/**Replaces word's `name` in `def` with `[...]` block
 * required to exclude the answer from the question
 */
export function prepareDef(def?: string | null, name?: string | null): string {
  if (!def || !name) {
    return '';
  }
  return def
    .split(' ')
    .map(word =>
      word.toLocaleLowerCase() === name.toLocaleLowerCase() ? '[...]' : word
    )
    .join(' ');
}

export function generateOptions(
  data: Word[],
  count: number,
  currentWordId: string,
  language: Language
) {
  const moreOptions = madeUphWords[language];
  let optCandidates: Partial<Word>[] = data.filter(
    word => word.id !== currentWordId
  );
  const result: Partial<Word>[] = [];

  if (optCandidates.length + moreOptions.length < count) {
    throw new OperationResolutionError(`Not enough words to generate options.`);
  }
  if (optCandidates.length < count) {
    const opts = moreOptions.slice(0, count - optCandidates.length);
    optCandidates = [...optCandidates, ...opts];
  }
  const randomIndexes: number[] = [];
  do {
    const randomIndex = generateRandomNumber(optCandidates.length);
    const randomWord = optCandidates[randomIndex];
    if (
      randomWord &&
      randomWord?.id !== currentWordId &&
      !randomIndexes.includes(randomIndex)
    ) {
      randomIndexes.push(randomIndex);
      result.push(randomWord);
    }
  } while (result.length < count);
  return result;
}

export function insertAnswer(data: string[], answer: string) {
  const result = [...data];
  const randomIndex = generateRandomNumber(data.length + 1);
  result.splice(randomIndex, 0, answer);
  return result;
}

// @ts-ignore
export const generateGameData: GenerateGameDataFuncType = (
  gameType,
  data,
  config
) => {
  let questions;
  const { optionsPerGame, wordsPerGame, minWords } = config;

  let wordsCandidates = data;

  if (gameType === Game.Audio) {
    wordsCandidates = data.filter(word => word.audioUrl);
  }

  if (wordsCandidates.length < minWords) {
    throw new OperationResolutionError(
      `Not enough words to start a game. You have ${
        wordsCandidates.length
      } words${
        gameType === Game.Audio ? ' with audio' : ''
      }. Words requited for the game: ${minWords}`
    );
  }
  //TODO uncomment this if I decide to implement find def game with words with single defs only
  // if (gameType === Game.SelectDef) {
  //   wordsCandidates = data.filter(word => word.shortDef.length === 1);
  // }
  const words = wordsCandidates.slice(0, wordsPerGame);
  if (gameType === Game.TypeWord) {
    questions = words.map(word => {
      const { name, shortDef, id, audioUrl, imgUrl, defs } = word;
      const examples = getExamples(defs);
      const question = shortDef.map(def => prepareDef(def, name));
      return {
        answer: name,
        wordId: id,
        question,
        additionalInfo: {
          audioUrl,
          imgUrl,
          examples
        }
      };
    });
  }

  if (gameType === Game.Audio) {
    questions = words.map(word => {
      const { name, audioUrl, id, defs, imgUrl, shortDef } = word;
      const examples = getExamples(defs);
      return {
        answer: name,
        question: [audioUrl],
        wordId: id,
        additionalInfo: {
          imgUrl,
          examples,
          shortDef: `<b>${name} means</b> ${shortDef[0]}`
        }
      };
    });
  }
  //TODO create 'find all defs' game to train the words with multiple definitions
  if (gameType === Game.SelectDef) {
    questions = words.map(word => {
      const { name, shortDef, id, audioUrl, language, defs, imgUrl } = word;
      const opts = generateOptions(data, optionsPerGame - 1, id, language);
      const options = opts.map(opt => prepareDef(opt?.shortDef?.[0], name));
      const answer = prepareDef(shortDef[0], name);
      const examples = getExamples(defs);
      return {
        //TODO: filter the words so only ones with single definition will remain
        answer,
        question: [name],
        wordId: id,
        options: insertAnswer(options, answer),
        additionalInfo: {
          audioUrl,
          examples,
          imgUrl
        }
      };
    });
  }

  if (gameType === Game.SelectWord) {
    questions = words.map(word => {
      const { name, shortDef, id, audioUrl, language, defs, imgUrl } = word;
      const opts = generateOptions(data, optionsPerGame - 1, id, language);
      const options = opts.map(opt => opt.name);
      const answer = name;
      const examples = getExamples(defs);
      const question = shortDef.map(def => prepareDef(def, name));

      return {
        answer,
        question,
        wordId: id,
        // @ts-ignore
        options: insertAnswer(options, answer),
        additionalInfo: {
          audioUrl,
          examples,
          imgUrl
        }
      };
    });
  }

  return {
    task: tasks[config.type],
    type: gameType,
    questions
  };
};
