import {
  Game,
  Word,
  GameData,
  GameConfig,
  Language,
  WordDefinition,
  DefExample,
  GameQuestion,
  Tense
} from '../generated/graphql';
import { OperationResolutionError } from './apolloCustomErrors';
import { madeUphWords } from '../mocks/madeUpWord';
import { TENSES } from '../dictionary/constants';

export type GenerateGameDataFuncType = (
  gameType: Game,
  words: Word[],
  config: GameConfig,
  optionsMaterial?: Word[] | null,
  tense?: Tense
) => GameData;

export function generateRandomNumber(limit: number) {
  return Math.floor(Math.random() * limit);
}

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

/**Replaces word's `name` in `def` with `[...]` block
 * required to exclude the answer from the question
 */
export function prepareDef(def?: string | null, name?: string | null): string {
  if (!def || !name) {
    return '';
  }

  const replacement = ' [...] ';
  const word = name.toLocaleLowerCase();

  let result = def.replaceAll(new RegExp(` ${word} `, 'gi'), replacement);

  if (result.toLocaleLowerCase().startsWith(`${word} `)) {
    result = result.replace(new RegExp(`${word} `, 'i'), replacement).trim();
  }

  if (result.toLocaleLowerCase().endsWith(` ${word}`)) {
    result = result.replace(new RegExp(` ${word}`, 'i'), replacement).trim();
  }

  return result;
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
  config,
  optionsMaterial,
  tense = Tense.Pind
) => {
  const tasks = {
    [Game.Audio]: "Type the word that you've heard",
    [Game.SelectDef]: 'Select a definition that means ',
    [Game.SelectWord]: 'Select a word that means ',
    [Game.TypeWord]: 'Type a word that means ',
    [Game.Conjugation]: `Conjugate the verb in ${TENSES[tense]}`
  };

  let questions;
  const { optionsPerGame, wordsPerGame, minWords } = config;

  let wordsCandidates = data;

  const optionsCandidates = optionsMaterial?.length ? optionsMaterial : data;

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
      const {
        name,
        shortDef,
        id,
        audioUrl,
        imgUrl,
        defs,
        alternativeSpelling
      } = word;
      const examples = getExamples(defs);
      const question = shortDef.map(def => prepareDef(def, name));
      const result: GameQuestion = {
        answer: name,
        wordId: id,
        question,
        additionalInfo: {
          audioUrl,
          imgUrl,
          examples
        }
      };
      if (alternativeSpelling?.length) {
        result.alternativeSpelling = alternativeSpelling;
      }
      return result;
    });
  }

  if (gameType === Game.Audio) {
    questions = words.map(word => {
      const {
        name,
        audioUrl,
        id,
        defs,
        imgUrl,
        shortDef,
        alternativeSpelling
      } = word;

      const examples = getExamples(defs);

      const result: GameQuestion = {
        answer: name,
        question: [audioUrl] as string[],
        wordId: id,
        additionalInfo: {
          imgUrl,
          examples,
          shortDef: `<b>${name} means</b> ${shortDef[0]}`
        }
      };

      if (alternativeSpelling?.length) {
        result.alternativeSpelling = alternativeSpelling;
      }

      return result;
    });
  }
  //TODO create 'find all defs' game to train the words with multiple definitions
  if (gameType === Game.SelectDef) {
    questions = words.map(word => {
      const { name, shortDef, id, audioUrl, language, defs, imgUrl } = word;
      const opts = generateOptions(
        optionsCandidates,
        optionsPerGame - 1,
        id,
        language
      );
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
      const opts = generateOptions(
        optionsCandidates,
        optionsPerGame - 1,
        id,
        language
      );
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

  if (gameType === Game.Conjugation) {
    questions = words.map(word => {
      const { imgUrl, shortDef, audioUrl, name, id, conjugation } = word;
      const verbForms = conjugation?.find(conj => conj?.cjid === tense)?.cjfs;

      if (!verbForms) {
        return;
      }

      return {
        question: [name],
        answer: verbForms.join(', '),
        wordId: id,
        additionalInfo: {
          imgUrl,
          audioUrl,
          shortDef: `<b>${name} means</b> ${shortDef[0]}`
        }
      };
    });

    if (!questions?.length) {
      throw new OperationResolutionError(
        `Not enough words to start a game. You need at least ${minWords} verb to conjugate`
      );
    }
  }

  return {
    task: tasks[config.type],
    type: gameType,
    questions
  };
};
