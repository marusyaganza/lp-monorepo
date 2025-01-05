import { uniq } from 'lodash';
import { DEFAULT_LANGUAGE } from '../../constants/defaultValues';
import { WordModel } from '../../db/models/Word/Word';
import {
  Game,
  GameData,
  GameDataInput,
  GameSettings,
  Word
} from '../../generated/graphql';
import {
  generateOptions,
  getExamples,
  getGameTask,
  prepareDef
} from '../helpers';

export async function generateSelectWordGame(
  words: Word[],
  parameters: GameDataInput,
  config: GameSettings,
  user: string
): Promise<GameData> {
  const gameType = Game.SelectWord;
  const language = parameters.language || DEFAULT_LANGUAGE;
  const optionsCandidates = await WordModel.selectWordsForOptions(
    gameType,
    language,
    config,
    user
  );

  const questions = words.map(word => {
    const { name, shortDef, id, audioUrl, defs, imgUrl } = word;
    const opts = generateOptions(
      optionsCandidates,
      config.optionsPerGame,
      word,
      language
    );
    const options: string[] = opts.map(opt => opt.name);
    const answer = [name];
    const examples = getExamples(defs);
    const question = uniq(
      shortDef.slice(0, 3).map(def => prepareDef(def, name))
    );

    return {
      answer,
      question,
      wordId: id,
      options,
      additionalInfo: {
        audioUrl,
        examples,
        imgUrl
      }
    };
  });

  const task = getGameTask(gameType);

  return { questions, task, type: gameType };
}
