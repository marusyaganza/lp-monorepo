import { Game, Word, GameData, GameConfig } from '../generated/graphql';
import { OperationResolutionError } from './apolloCustomErrors';
import { madeUpWord } from '../mocks/madeUpWord';

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

/**Replaces word's `name` in `def` with `[...]` block
 * required to exclude the answer from the question
 */
export function prepareDef(def: string, name: string): string {
  return def
    .split(' ')
    .filter(word => word !== name)
    .join(' ');
}

export function generateOptions(
  data: Word[],
  count: number,
  currentWordId: string
) {
  const result = [];
  if (data.length < count) {
    result.push(madeUpWord);
  }
  const randomIndexes: number[] = [];
  do {
    const randomIndex = generateRandomNumber(data.length);
    const randomWord = data[randomIndex];
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
  const { optionsPerGame, wordsPerGame } = config;

  let wordsCandidates = data;

  if (gameType === Game.Audio) {
    wordsCandidates = data.filter(word => word.audioUrl);
    if (wordsCandidates.length < wordsPerGame) {
      throw new OperationResolutionError(
        `Not enough words to start a game. You have ${wordsCandidates.length} words with audio. Words requited for the game: ${wordsPerGame}`
      );
    }
  }
  //TODO uncomment this if I decide to implement find def game with words with single defs only
  // if (gameType === Game.SelectDef) {
  //   wordsCandidates = data.filter(word => word.shortDef.length === 1);
  // }
  const words = wordsCandidates.slice(0, wordsPerGame);
  if (gameType === Game.TypeWord) {
    questions = words.map(word => {
      const { name, shortDef, id, audioUrl } = word;
      return {
        answer: name,
        wordId: id,
        question: shortDef,
        additionalInfo: {
          audioUrl
        }
      };
    });
  }

  if (gameType === Game.Audio) {
    questions = words.map(word => {
      const { name, audioUrl, id } = word;
      return {
        answer: name,
        question: [audioUrl],
        wordId: id
      };
    });
  }
  //TODO create 'find all defs' game to train the words with multiple definitions
  if (gameType === Game.SelectDef) {
    questions = words.map(word => {
      const { name, shortDef, id, audioUrl } = word;
      const opts = generateOptions(data, optionsPerGame - 1, id);
      const options = opts.map(opt =>
        prepareDef(opt.shortDef[0] as string, name)
      );
      const answer = prepareDef(shortDef[0] as string, name);
      return {
        //TODO: filter the words so only ones with single definition will remain
        answer,
        question: [name],
        wordId: id,
        options: insertAnswer(options, answer),
        additionalInfo: {
          audioUrl
        }
      };
    });
  }

  if (gameType === Game.SelectWord) {
    questions = words.map(word => {
      const { name, shortDef, id, audioUrl } = word;
      const opts = generateOptions(data, optionsPerGame - 1, id);
      const options = opts.map(opt => opt.name);
      const answer = name;
      return {
        answer,
        question: shortDef,
        wordId: id,
        options: insertAnswer(options, answer),
        additionalInfo: {
          audioUrl
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
