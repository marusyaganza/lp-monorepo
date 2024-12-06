import { Game, GameData, GameQuestion, Word } from '../../generated/graphql';
import { getExamples, getGameTask, prepareDef } from '../helpers';

export async function generateTypeWordGame(words: Word[]): Promise<GameData> {
  const gameType = Game.TypeWord;

  const questions = words.map(word => {
    const { name, shortDef, id, audioUrl, imgUrl, defs, alternativeSpelling } =
      word;
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

  const task = getGameTask(gameType);

  return { questions, task, type: gameType };
}
