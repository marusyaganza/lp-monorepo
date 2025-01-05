import {
  Game,
  GameData,
  GameDataInput,
  GameQuestion,
  Word
} from '../../generated/graphql';
import { getGameTask } from '../helpers';
import { OperationResolutionError } from '../../utils/apolloCustomErrors';
import { DEFAULT_TENSE } from '../../constants/defaultValues';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { isGameQuestion } from '../../types/typeGuards';

export async function generateConjugationGame(
  words: Word[],
  parameters: GameDataInput
): Promise<GameData> {
  const gameType = Game.Conjugation;
  const tense = parameters?.tense || DEFAULT_TENSE;

  const questionsArray: (GameQuestion | undefined)[] = words.map(word => {
    const { imgUrl, shortDef, audioUrl, name, id, conjugation } = word;
    const verbForms = conjugation?.find(conj => conj?.cjid === tense)?.cjfs;

    // if the word does not have a verb form or it does not have values
    if (!verbForms || verbForms?.every(val => val === '-')) {
      return undefined;
    }

    return {
      question: [name],
      answer: verbForms,
      wordId: id,
      additionalInfo: {
        imgUrl,
        audioUrl,
        shortDef: `<b>${name} means</b> ${shortDef[0]}`
      }
    };
  });

  const questions = questionsArray.filter(isGameQuestion);

  if (!questions?.length) {
    throw new OperationResolutionError(ERROR_MESSAGES.GAME_GENERATION_FAILED);
  }

  const task = getGameTask(gameType, tense);

  return { questions, task, type: gameType, tense };
}
