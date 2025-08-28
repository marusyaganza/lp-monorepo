import { DEFAULT_LANGUAGE } from '../constants/defaultValues';
import { DEFAULT_GAMES_SETTINGS } from '../constants/defaultGameSettings';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { WordModel } from '../db/models/Word/Word';
import { Game, GameDataInput, SortBy } from '../generated/graphql';
import { GameDataGeneratorFunc } from '../types/types';
import { OperationResolutionError } from '../utils/apolloCustomErrors';
import { generateAudioGame } from './generators/generateAudioGame';
import { generateConjugationGame } from './generators/generateConjugationGame';
import { generateGenderGame } from './generators/generateGenderGame';
import { generateImageGame } from './generators/generateImageGame';
import { generateSelectDefGame } from './generators/generateSelectDefGame';
import { generateSelectWordGame } from './generators/generateSelectWordGame';
import { generateSpeakingGame } from './generators/generateSpeakingGame';
import { generateTypeWordGame } from './generators/generateTypeWordGame';

const generators: Record<Game, GameDataGeneratorFunc> = {
  [Game.Audio]: generateAudioGame,
  [Game.TypeWord]: generateTypeWordGame,
  [Game.SelectWord]: generateSelectWordGame,
  [Game.SelectDef]: generateSelectDefGame,
  [Game.Image]: generateImageGame,
  [Game.Conjugation]: generateConjugationGame,
  [Game.Gender]: generateGenderGame,
  [Game.Speaking]: generateSpeakingGame
};

export async function generateGameData(
  parameters: GameDataInput,
  user: string
) {
  const language = parameters?.language || DEFAULT_LANGUAGE;
  const { gameType, wordId } = parameters;
  const config = DEFAULT_GAMES_SETTINGS[gameType];
  if (!config.languages.includes(language)) {
    throw new OperationResolutionError(ERROR_MESSAGES.GAME_NOT_AVAILABLE);
  }

  let words;

  if (wordId) {
    const word = await WordModel.findById(wordId, user);
    if (!word) {
      throw new OperationResolutionError(`Word is not found`);
    }
    words = [word];
  } else {
    if (parameters.sortBy === SortBy.SpacedRepetition) {
      words = await WordModel.getWordsForPractice(parameters, config, user);
    } else {
      words = await WordModel.selectWordsForGame(parameters, config, user);
    }
    const { minWords } = config;
    if (!minWords || words.length < minWords) {
      throw new OperationResolutionError(
        `not enough words to start a game. You have ${words.length} word. Words requited for the game: ${minWords}`
      );
    }
  }

  const gameData = generators[gameType](words, parameters, config, user);
  return gameData;
}
