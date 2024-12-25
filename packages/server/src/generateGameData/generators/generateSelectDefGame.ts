import { DEFAULT_LANGUAGE } from '../../constants/defaultValues';
import { WordModel } from '../../db/models/Word/Word';
import {
  Game,
  GameConfig,
  GameData,
  GameDataInput,
  Word
} from '../../generated/graphql';
import {
  generateOptions,
  getExamples,
  getGameTask,
  prepareDef
} from '../helpers';

export async function generateSelectDefGame(
  words: Word[],
  parameters: GameDataInput,
  config: GameConfig,
  user: string
): Promise<GameData> {
  const gameType = Game.SelectDef;
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
    const options = opts.map(opt => prepareDef(opt?.shortDef?.[0], name));
    const answer = [prepareDef(shortDef[0], name)];
    const examples = getExamples(defs);
    return {
      answer,
      question: [name],
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
