import { Game, GameData, GameQuestion, Word } from '../../generated/graphql';
import { isGameQuestion } from '../../types/typeGuards';
import { getExamples, getGameTask } from '../helpers';

export async function generateGenderGame(words: Word[]): Promise<GameData> {
  const gameType = Game.Gender;

  const GENDERS = ['feminine', 'masculine'];

  const questionsArray = words.map(word => {
    const { name, shortDef, id, audioUrl, imgUrl, defs, particle } = word;

    const examples = getExamples(defs);
    const answer = particle
      ?.split(' ')
      ?.filter(word => GENDERS.includes(word))
      ?.sort();

    if (!answer.length) {
      return;
    }

    const result: GameQuestion = {
      answer,
      wordId: id,
      question: [name],
      additionalInfo: {
        audioUrl,
        shortDef: `<b>${name} means</b> ${shortDef[0]}`,
        imgUrl,
        examples
      }
    };

    return result;
  });

  const questions = questionsArray.filter(isGameQuestion);

  const task = getGameTask(gameType);

  return { questions, task, type: gameType };
}
