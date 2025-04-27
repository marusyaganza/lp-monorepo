import { Game, GameData, GameQuestion, Word } from '../../generated/graphql';
import { getExamples, getGameTask, prepareDef } from '../helpers';
import { uniq } from 'lodash';

export async function generateSpeakingGame(words: Word[]): Promise<GameData> {
  const gameType = Game.Speaking;

  const questions = words.map(word => {
    const {
      name,
      shortDef,
      id,
      audioUrl,
      imgUrl,
      defs,
      alternativeSpelling = []
    } = word;

    const examples = getExamples(defs);
    const question = uniq(shortDef.map(def => prepareDef(def, name)));
    const answer = alternativeSpelling?.length
      ? [name, ...alternativeSpelling]
      : [name];

    const result: GameQuestion = {
      answer,
      wordId: id,
      question,
      additionalInfo: {
        audioUrl,
        imgUrl,
        examples
      }
    };

    return result;
  });

  const task = getGameTask(gameType);

  return { questions, task, type: gameType };
}
