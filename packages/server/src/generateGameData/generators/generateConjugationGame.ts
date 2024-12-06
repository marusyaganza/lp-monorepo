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

export async function generateConjugationGame(
  words: Word[],
  parameters: GameDataInput
): Promise<GameData> {
  const gameType = Game.Conjugation;
  const tense = parameters?.tense || DEFAULT_TENSE;

  const questions: GameQuestion[] = words
    .map(word => {
      const { imgUrl, shortDef, audioUrl, name, id, conjugation } = word;
      const verbForms = conjugation?.find(conj => conj?.cjid === tense)?.cjfs;

      if (!verbForms) {
        throw new OperationResolutionError(
          ERROR_MESSAGES.GAME_GENERATION_FAILED
        );
      }

      return {
        question: [name],
        answer: verbForms.join(', '),
        wordId: id,
        additionalInfo: {
          imgUrl,
          audioUrl,
          shortDef: `<b>${name} means</b> ${shortDef[0]}`
        }
      };
    })
    .filter(Boolean);

  const task = getGameTask(gameType, tense);

  return { questions, task, type: gameType, tense };
}
