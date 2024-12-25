import { Game, GameData, GameQuestion, Word } from '../../generated/graphql';
import { getExamples, getGameTask } from '../helpers';
import { isWordWithAudio } from '../../types/typeGuards';
import { OperationResolutionError } from '../../utils/apolloCustomErrors';
import { ERROR_MESSAGES } from '../../constants/errorMessages';

export async function generateAudioGame(words: Word[]): Promise<GameData> {
  const gameType = Game.Audio;

  const questions = words.map(word => {
    if (!isWordWithAudio(word)) {
      throw new OperationResolutionError(ERROR_MESSAGES.GAME_GENERATION_FAILED);
    }
    const {
      name,
      audioUrl,
      id,
      defs,
      imgUrl,
      shortDef,
      alternativeSpelling = []
    } = word;

    const examples = getExamples(defs);

    const answer = [name, ...alternativeSpelling];

    const result: GameQuestion = {
      answer: answer,
      question: [audioUrl],
      wordId: id,
      additionalInfo: {
        imgUrl,
        examples,
        shortDef: `<b>${name} means</b> ${shortDef[0]}`
      }
    };

    return result;
  });

  const task = getGameTask(gameType);

  return { questions, task, type: gameType };
}
