import { DEFAULT_LANGUAGE } from '../constants/defaultValues';
import { DEFAULT_GAMES_SETTINGS } from '../constants/defultGameSettings';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { WordModel } from '../db/models/Word/Word';
import { Game, GameDataInput } from '../generated/graphql';
import { GameDataGeneratorFunc } from '../types/types';
import { OperationResolutionError } from '../utils/apolloCustomErrors';
import { generateAudioGame } from './generators/generateAudioGame';
import { generateConjugationGame } from './generators/generateConjugationGame';
import { generateGenderGame } from './generators/generateGenderGame';
import { generateSelectDefGame } from './generators/generateSelectDefGame';
import { generateSelectWordGame } from './generators/generateSelectWordGame';
import { generateTypeWordGame } from './generators/generateTypeWordGame';

const generators: Record<Game, GameDataGeneratorFunc> = {
  [Game.Audio]: generateAudioGame,
  [Game.TypeWord]: generateTypeWordGame,
  [Game.SelectWord]: generateSelectWordGame,
  [Game.SelectDef]: generateSelectDefGame,
  [Game.Conjugation]: generateConjugationGame,
  [Game.Gender]: generateGenderGame
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
    const { minWords } = config;
    words = await WordModel.selectWordsForGame(parameters, config, user);
    if (!minWords || words.length < minWords) {
      throw new OperationResolutionError(
        `not enough words to start a game. You have ${words.length} word. Words requited for the game: ${minWords}`
      );
    }
  }

  const gameData = generators[gameType](words, parameters, config, user);
  return gameData;
}
