import { Score } from '../../../generated/graphql';
import { GameResultType } from '../../../types/gameTypes';

function formatString(str: string): string {
  return str.trim().toLocaleLowerCase();
}

export function checkTextAnswer(
  val: string,
  corrrectAnswer: string[]
): GameResultType {
  const errorCount = corrrectAnswer
    ?.map(formatString)
    .includes(formatString(val))
    ? 0
    : countSpellingMistakes(val, corrrectAnswer[0]);
  console.log('errorCount', errorCount);
  return { score: calculateScore(errorCount), hasError: errorCount !== 0 };
}

export function checkMultipleAnswers(
  val: string[],
  corrrectAnswer: string[]
): GameResultType {
  if (val?.length !== corrrectAnswer?.length) {
    return { hasError: true, score: Score.Again };
  }
  const formattedValues = val.map(formatString);
  const isCorrect = corrrectAnswer
    .map(formatString)
    .every((answer, i) => formattedValues[i] === answer);
  return { hasError: !isCorrect, score: isCorrect ? Score.Good : Score.Hard };
}

function countSpellingMistakes(input: string, correctAnswer: string): number {
  let mistakes = 0;
  const minLength = Math.min(input.length, correctAnswer.length);

  for (let i = 0; i < minLength; i++) {
    if (input[i] !== correctAnswer[i]) {
      mistakes++;
    }
  }

  mistakes += Math.abs(input.length - correctAnswer.length);

  return mistakes;
}

function calculateScore(errorsCount: number): Score {
  if (errorsCount === 0) {
    return Score.Good;
  }
  if (errorsCount > 2) {
    return Score.Again;
  }
  return Score.Hard;
}
